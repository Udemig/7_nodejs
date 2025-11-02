import { catchAsync } from "./utils/index.js";
import deliveryService from "./delivery.service.js";

class DeliveryController {
  handler1 = catchAsync(async (req, res, next) => {});
  handler2 = catchAsync(async (req, res, next) => {});
  handler3 = catchAsync(async (req, res, next) => {});
}

export default new DeliveryController();
