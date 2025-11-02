import { catchAsync } from "./utils/index.js";
import orderService from "./order.service.js";

class OrderController {
  handler1 = catchAsync(async (req, res, next) => {});
  handler2 = catchAsync(async (req, res, next) => {});
  handler3 = catchAsync(async (req, res, next) => {});
}

export default new OrderController();
