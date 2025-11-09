import amqp, { type Channel, type ChannelModel } from "amqplib";
import type { IOrder } from "./types/index.js";

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";
  private readonly deliveryQueue = "delivery_queue";

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

      // Kuyrukları exchange'e bağla
      await this.channel.bindQueue(
        this.deliveryQueue,
        this.exchangeName,
        "order.*"
      );

      // Kuyruktan mesajları al
      await this.consumeDeliveryMessages();

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
   ! Kuyruktan mesajları al
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
        const messages = JSON.parse(message.content.toString()) as IOrder;

        // gerekli servis işlemlerini yap
        console.log("Mesaj geldi", messages);

        // aldığımız mesajı kuyruktan sil
        this.channel?.ack(message);
      } catch (error) {
        console.log("Hata oluştu", error);
        // hata oluştuğunda mesajı tekrar kuyruğa gön
        this.channel?.nack(message, false, true);
      }
    });
  }
}

export default new RabbitMQService();
