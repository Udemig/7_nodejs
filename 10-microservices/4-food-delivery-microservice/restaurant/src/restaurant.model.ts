import mongoose, { Schema } from "mongoose";
import type { IRestaurant } from "./types/index.js";

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: [true, "Ad zorunludur"] },
    description: { type: String, required: [true, "Açıklama zorunludur"] },
    address: { type: String, required: [true, "Adres zorunludur"] },
    phone: { type: String, required: [true, "Telefon zorunludur"] },
    email: { type: String, required: [true, "Email zorunludur"] },
    categories: { type: [String], required: [true, "Kategoriler zorunludur"] },
    deliveryTime: {
      type: Number,
      required: [true, "Teslimat süresi zorunludur"],
    },
    minOrderPrice: {
      type: Number,
      required: [true, "En az sipariş ücreti zorunludur"],
    },
    deliveryFee: {
      type: Number,
      required: [true, "Teslimat ücreti zorunludur"],
    },
    isActive: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: false },
    ownerId: { type: String, required: [true, "Sahibinin id'si zorunludur"] },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: any, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
