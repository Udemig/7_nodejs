import express from "express";
import { login, logout, register } from "../controller/authController.js";

// Router oluştur
const router = express.Router();

// Her route'a karşılık gelecek fonksiyonu belirle

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// router'ı dosya dışarısına çıkar
export default router;
