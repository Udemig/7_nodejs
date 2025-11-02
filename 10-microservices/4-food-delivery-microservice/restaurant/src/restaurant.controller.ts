import { catchAsync } from "./utils/index.js";
import restaurantService from "./restaurant.service.js";

class RestaurantController {
  handler1 = catchAsync(async (req, res, next) => {});
  handler2 = catchAsync(async (req, res, next) => {});
  handler3 = catchAsync(async (req, res, next) => {});
}

export default new RestaurantController();
