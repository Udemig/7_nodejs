import rabbitmqService from "./rabbitmq.service.js";
import Delivery, { Courier } from "./delivery.model.js";
import type { DeliveryUpdate } from "./delivery.dto.js";

// Business Logic'i yöneticek ve veritabanı ile iletişime geç
class DeliveryService {
  private initialized: boolean = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    if (!this.initialized) {
      await rabbitmqService.initialize();
      this.initialized = true;
    }
  }

  async getAvailableDeliveries() {
    return await Delivery.find({
      status: { $in: ["pending", "ready"] },
      courierId: null,
    });
  }

  async acceptDelivery(orderId: string, courierId: string) {
    // kurye durumunu güncelle
    await Courier.findByIdAndUpdate(courierId, { status: "busy" });

    // siparişi kuryeye ata
    return await Delivery.findOneAndUpdate(
      { orderId },
      { courierId, status: "assigned", acceptedAt: new Date() },
      { new: true }
    );
  }

  async updateDelivery(
    orderId: string,
    courierId: string,
    deliveryData: DeliveryUpdate
  ) {
    // siparişi bul
    const delivery = await Delivery.findOne({ orderId });
    // sipariş kuryenin üstünde mi kontrol et
    if (delivery?.courierId !== courierId) {
      throw new Error("Bu siparişi güncellemek için yetkiniz yok");
    }

    // kurye siparişi alıp yola çıktıysa (status,location) güncelle
    if (deliveryData.status === "on_the_way") {
      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "on_the_way", location: deliveryData.location },
        { new: true }
      );
    }

    // kurye siparişi teslim ettityse (actualDeliveryTime,status) güncelle ve kuryeyi boşta bırak
    if (deliveryData.status === "delivered") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });

      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "delivered", actualDeliveryTime: new Date() },
        { new: true }
      );
    }

    // kurye siparişi iptal ettiyse (status,notes) güncelle ve kuryeyi boşta bırak
    if (deliveryData.status === "cancelled") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });

      return await Delivery.findOneAndUpdate(
        { orderId },
        {
          status: "cancelled",
          courierId: null,
          acceptedAt: null,
          notes: deliveryData.notes,
        },
        { new: true }
      );
    }
  }

  async trackDelivery(orderId: string) {
    const delivery = await Delivery.findOne({ orderId });

    if (!delivery) {
      throw new Error("Bu sipariş bulunamadı");
    }

    return delivery;
  }
}

export default new DeliveryService();
