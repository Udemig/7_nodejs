import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

// dotenv kurulumu
dotenv.config();

// Express uygulması oluştur
const app = express();

// İsteğin body'sini işle
app.use(express.json());

// İstekle gelen cookie'leri işle
app.use(cookieParser());

// Veri tabanı ile iletişime geç
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`⚡️Veri tabanına başarıyla bağlanıldı.`);
  })
  .catch((err) => {
    console.log(`❌ Veri tabanına bağlanırken bir hata oluştu`);
  });

// Routeları oluştur
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server 4044 portunda çalışıyor...`);
});
