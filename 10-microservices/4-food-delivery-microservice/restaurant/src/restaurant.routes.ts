import express from "express";
import restaurantController from "./restaurant.controller.js";

const router = express.Router();

router.post("/handler1", restaurantController.handler1);
router.post("/handler2", restaurantController.handler2);
router.post("/handler3", restaurantController.handler3);

export default router;
