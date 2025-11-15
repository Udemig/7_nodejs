import amqp, { type Channel, type ChannelModel } from "amqplib";

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";

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
}

export default new RabbitMQService();
