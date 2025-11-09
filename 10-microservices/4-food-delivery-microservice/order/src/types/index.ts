import type { NextFunction, Request, Response } from "express";

export type RouteParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type UserRole = "customer" | "restaurant_owner" | "courier" | "admin";

export interface JWTPayload {
  userId: string;
  role: UserRole;
  iat: number;
  exp: number;
}
