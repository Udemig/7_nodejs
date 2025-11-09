import type { NextFunction, Request, Response } from "express";
import type { Document } from "mongoose";

export type RouteParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type UserRole = "customer" | "restaurant_owner" | "courier" | "admin";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export type Location = {
  lat: number;
  lon: number;
};

export interface IDelivery extends Document {
  orderId: string;
  courierId?: string;
  status: OrderStatus;
  location?: Location;
  notes?: string;
  actualDeliveryTime?: Date;
  acceptedAt?: Date;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IAddress {
  title: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface IOrder extends Document {
  userId: string;
  restaurantId: string;
  items: IOrderItem[];
  totalPrice?: number;
  deliveryAddress: IAddress;
  paymentMethod: "credit_card" | "cash" | "mobile_payment";
  status: OrderStatus;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}
