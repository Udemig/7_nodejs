import type { Location, IDelivery } from "./types/index.js";
import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema<Location>(
  {
    lat: { type: Number, required: [true, "Enlem zorunludur"] },
    lon: { type: Number, required: [true, "Boylam zorunludur"] },
  },
  { _id: false }
);

const deliverySchema = new Schema<IDelivery>(
  {
    orderId: { type: String, required: [true, "Sipariş id'si zorunludur"] },
    courierId: { type: String, required: [true, "Kurye id'si zorunludur"] },
    status: {
      type: String,
      required: [true, "Durum zorunludur"],
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "on_the_way",
        "delivered",
        "cancelled",
      ],
    },
    location: { type: locationSchema, default: null },
    actualDeliveryTime: { type: Date, default: null },
    acceptedAt: { type: Date, default: null },
    notes: { type: String, default: null },
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

export default mongoose.model<IDelivery>("Delivery", deliverySchema);
