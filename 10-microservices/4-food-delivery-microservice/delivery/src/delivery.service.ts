import rabbitmqService from "./rabbitmq.service.js";

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
}

export default new DeliveryService();
