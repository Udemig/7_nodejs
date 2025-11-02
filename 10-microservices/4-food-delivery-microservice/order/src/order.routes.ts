import express from "express";
import orderController from "./order.controller.js";

const router = express.Router();

router.post("/handler1", orderController.handler1);
router.post("/handler2", orderController.handler2);
router.post("/handler3", orderController.handler3);

export default router;
