import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import gigRouter from "./routes/gigRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// dotenv kurulumu
dotenv.config();

// Express uygulması oluştur
const app = express();

// İsteğin body'sini işle
app.use(express.json());

// İstekle gelen cookie'leri işle
app.use(cookieParser());

// Cors hatalarının önüne geçmek için header ekle
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

// Veri tabanı ile iletişime geç
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`⚡️Veri tabanına başarıyla bağlanıldı.`);
  })
  .catch((err) => {
    console.log(`❌ Veri tabanına bağlanırken bir hata oluştu`, err);
  });

// Routeları oluştur (uygulamaya tanıt)
app.use("/api/auth", authRouter);
app.use("/api/gig", gigRouter);



app.listen(process.env.PORT, () => {
  console.log(`Server 4044 portunda çalışıyor...`);
});
