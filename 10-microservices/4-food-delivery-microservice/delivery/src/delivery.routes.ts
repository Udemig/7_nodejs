import express from "express";
import deliveryController from "./delivery.controller.js";
import { authenticate, authorize } from "./delivery.middleware.js";

const router = express.Router();

router.post(
  "/handler1",
  authenticate,
  authorize(["courier"]),
  deliveryController.handler1
);
router.post("/handler2", deliveryController.handler2);
router.post("/handler3", deliveryController.handler3);

export default router;
