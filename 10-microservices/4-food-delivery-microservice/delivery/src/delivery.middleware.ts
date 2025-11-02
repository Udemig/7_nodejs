import type { NextFunction, Request, Response } from "express";
import type { Error } from "mongoose";

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
