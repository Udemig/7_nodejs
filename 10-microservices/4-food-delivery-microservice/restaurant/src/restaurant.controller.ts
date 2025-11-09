import { catchAsync } from "./utils/index.js";
import restaurantService from "./restaurant.service.js";
import {
  createRestaurantSchema,
  queryParamsSchema,
  validateDTO,
} from "./restaurant.dto.js";

class RestaurantController {
  getAllRestaurants = catchAsync(async (req, res, next) => {
    // arama parametrelerini kontrol et
    const queryParams = await validateDTO(queryParamsSchema, req.query);

    // servis methodunu çağır
    const result = await restaurantService.getAllRestaurants(queryParams);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Tüm restoranlar",
      data: result,
      queryParams,
    });
  });

  getRestaurantById = catchAsync(async (req, res, next) => {
    const id = req.params.id!;

    const result = await restaurantService.getRestaurantById(id);

    res.status(200).json({
      status: "success",
      message: "Restoran bulundu",
      data: result,
    });
  });

  getRestaurantMenu = catchAsync(async (req, res, next) => {});

  createRestaurant = catchAsync(async (req, res, next) => {
    // client'dan gelen veri geçerli mi kontrol et
    const body = await validateDTO(createRestaurantSchema, req.body);
    const ownerId = req.user!.userId;

    // servis methodunu çağır
    const result = await restaurantService.createRestaurant(body, ownerId);

    // client'a cevap gönder
    res.status(201).json({
      status: "success",
      message: "Restoran başarıyla oluşturuldu",
      data: result,
    });
  });

  createMenuItem = catchAsync(async (req, res, next) => {});
}

export default new RestaurantController();
