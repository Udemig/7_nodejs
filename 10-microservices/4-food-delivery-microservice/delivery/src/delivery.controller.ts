import { catchAsync } from "./utils/index.js";
import deliveryService from "./delivery.service.js";

class DeliveryController {
  acceptDelivery = catchAsync(async (req, res, next) => {});

  getAvailableDeliveries = catchAsync(async (req, res, next) => {});

  updateDeliveryStatus = catchAsync(async (req, res, next) => {});

  trackDelivery = catchAsync(async (req, res, next) => {});
}

export default new DeliveryController();
