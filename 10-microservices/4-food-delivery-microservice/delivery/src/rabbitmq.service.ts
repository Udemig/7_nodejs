import amqp, { type Channel, type ChannelModel } from "amqplib";
import type { ICourier, IOrder, IUser } from "./types/index.js";
import Delivery, { Courier } from "./delivery.model.js";

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";
  private readonly deliveryQueue = "delivery_queue";
  private readonly courierQueue = "courier_queue";

  /*
   ! RabbitMQ bağlantısı oluştur
   * - Exchange tipi "topic": routing key'e göre mesajları kuyruğa yönlendirir.
   * - {durable:true}: RabbitMQ restart edilse bile exchange kalır.
   */
  async initialize(): Promise<void> {
    try {
      // RabbitMQ'ya bağlan
      const url = process.env.RABBITMQ_URI;
      this.connection = await amqp.connect(url);

      // Kanal oluştur
      this.channel = await this.connection.createChannel();

      // Exchange oluştur
      await this.channel.assertExchange(this.exchangeName, "topic", {
        durable: true,
      });

      // Kuyruk oluştur
      await this.channel.assertQueue(this.deliveryQueue, { durable: true });
      await this.channel.assertQueue(this.courierQueue, { durable: true });

      // Kuyrukları exchange'e bağla
      await this.channel.bindQueue(
        this.deliveryQueue,
        this.exchangeName,
        "order.*"
      );
      await this.channel.bindQueue(
        this.courierQueue,
        this.exchangeName,
        "courier.*"
      );

      // Kuyruktan mesajları al
      await this.consumeDeliveryMessages();
      await this.consumeCourierMessages();

      console.log("✅ RabbitMQ'ya bağlandı");
    } catch (error) {
      console.error("RabbitMQ bağlantısı oluşturulurken hata oluştu:", error);
    }
  }

  /*
  !  Mesajları kuyuruğa gönder
  * routingKey: mesajın hangi kuyruğa gönderileceğini belirler (order.created)
  * rawMessage: mesajın içeriği
  * - persistent: mesajın kalıcı olmasını sağlar. rabbitmq restart edilse bile diske kaydedildiği için mesajlar kaybolmaz
  */
  async publishMessage(routingKey: string, rawMessage: unknown) {
    if (!this.channel) {
      throw new Error("RabbitMQ kanalı oluşturulmamış");
    }

    // yayınlanacak mesajı hazırla
    const message = Buffer.from(JSON.stringify(rawMessage));

    // mesajı exchange'e gönder
    this.channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
    });

    console.log(`✅ ${routingKey}'e mesajı gönderildi`);
  }

  /*
   ! Delivery Kuyruğundaki mesajları al
   * Delivery kuyruğuna gelen mesajları alır be işler
   * Order servis sipariş oluşturulduğunda ve hazır olduğunda mesaj gönderir
  */
  async consumeDeliveryMessages() {
    if (!this.channel) {
      throw new Error("RabbitMQ kanalı oluşturulmamış");
    }

    await this.channel.consume(this.deliveryQueue, async (message) => {
      if (!message) return;

      try {
        // mesajı buffer formatından JS Nesnesine çevir
        const deliveryMessage = JSON.parse(
          message.content.toString()
        ) as IOrder;

        // sipariş hazırlanma durumundaysa
        if (deliveryMessage.status === "pending") {
          // eğer sipariş durumu pending ise siparişi veritbanına kaydet
          const delivery = await Delivery.create({
            orderId: deliveryMessage.id,
            courierId: null,
            status: "pending",
          });

          // müsait kurye bul
          const courier = await Courier.findOne({ status: "available" }).sort({
            updatedAt: -1,
          });

          // müsait kurye varsa siparişi kuryeye ata
          if (courier) {
            // kurye durumunu güncelle
            await Courier.findByIdAndUpdate(courier.id, {
              status: "busy",
            });
            // sipariş verisini güncelle
            await Delivery.findByIdAndUpdate(delivery.id, {
              status: "assigned",
              courierId: courier.id,
              acceptedAt: new Date(),
            });
          }
        }

        // eğer sipariş durumu ready ise delivery'i günclle
        if (deliveryMessage.status === "ready") {
          await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id },
            { status: "ready" }
          );
        }

        // aldığımız mesajı kuyruktan sil
        this.channel?.ack(message);
      } catch (error) {
        console.log("Hata oluştu", error);
        // hata oluştuğunda mesajı tekrar kuyruğa gön
        this.channel?.nack(message, false, true);
      }
    });
  }

  // ! Courier Kuyruğundaki mesajları al
  async consumeCourierMessages() {
    if (!this.channel) {
      throw new Error("RabbitMQ kanalı oluşturulmamış");
    }

    await this.channel.consume(this.courierQueue, async (message) => {
      if (!message) return;

      try {
        // message buffer formatından JS Nesnesine çevir
        const userData = JSON.parse(message.content.toString()) as IUser;

        // yeni oluşturulan kuryeyi veritabanına kaydet
        await Courier.create({
          _id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          status: "available",
        });

        // mesajı kuyruktan sil
        this.channel?.ack(message);
        console.log("✅ Kurye oluşturuldu", userData.email);
      } catch (error) {
        console.log("Hata oluştu", error);
        this.channel?.nack(message, false, true);
      }
    });
  }
}

export default new RabbitMQService();
