import type { NextFunction, Request, Response } from "express";
import type { Error } from "mongoose";
import jwt from "jsonwebtoken";
import User from "./auth.model.js";
import type { JWTPayload } from "./types/index.js";

// hata mw
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message || "Bir şeyler ters gitti..";
  console.log(message);
  res.status(500).json({ status: "error", message });
};

// 404 mw
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(404)
    .json({ status: "error", message: "İstek attığınız adres bulunamadı." });
};

// jwt token doğrulama mw
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // token kontrolü
    const accessToken = req.cookies.token;
    if (!accessToken) {
      res.status(401).json({
        status: "error",
        message: "Token bulunamadı",
      });
      return;
    }

    // token geçerli mi kontrol et
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    ) as JWTPayload;

    // kullanıcı veritabanında hala kayıtlı mı
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        status: "error",
        message: "Geçersiz tolen veya kullanıcı aktif değil",
      });
      return;
    }

    // controller fonksiyonunda kullanıcı verisine erişmek için req nesnesine kullanıcıyı ekleyelim
    req.user = user;

    // sonraki işleme devam et
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: "error",
        message: "Token süresi doldu",
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Token geçersiz",
      });
    }
  }
};
