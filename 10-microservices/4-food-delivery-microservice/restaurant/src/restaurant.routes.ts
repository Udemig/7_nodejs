import express from "express";
import restaurantController from "./restaurant.controller.js";
import { authenticate, authorize } from "./restaurant.middleware.js";

const router = express.Router();

router.get(
  "/restaurants",
  authenticate,
  restaurantController.getAllRestaurants
);
router.get(
  "/restaurants/:id",
  authenticate,
  restaurantController.getRestaurantById
);
router.get(
  "/restaurants/:id/menu",
  authenticate,
  restaurantController.getRestaurantMenu
);
router.post(
  "/restaurants/:id/menu",
  authenticate,
  authorize(["restaurant_owner", "admin"]),
  restaurantController.createMenuItem
);
router.post(
  "/restaurants",
  authenticate,
  authorize(["restaurant_owner", "admin"]),
  restaurantController.createRestaurant
);

export default router;
