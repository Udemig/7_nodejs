import mongoose, { Schema } from "mongoose";

// Veri tipi tanımla
export interface ITicket {
  title: string;
  description: string;
  category: "Yazılım Sorunu" | "Donanım Sorunu" | "Bağlantı Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
}

// ticket verisi için şema
const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "title alanı zorunludur"],
    },
    description: {
      type: String,
      required: [true, "description alanı zorunludur"],
    },
    category: {
      type: String,
      required: [true, "category alanı zorunludur"],
      enum: ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu", "Diğer"],
    },
    priority: {
      type: Number,
      required: [true, "priority alanı zorunludur"],
      enum: [1, 2, 3, 4, 5],
    },
    progress: {
      type: Number,
      required: [true, "progress alanı zorunludur"],
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      required: [true, "status alanı zorunludur"],
      enum: ["Beklemede", "Devam Ediyor", "Çözüldü"],
    },
  },
  {
    timestamps: true, // zaman verisi ekler
    versionKey: false, // __v değerini kaldır
    toJSON: {
      // _id değerini kaldırıp yerine id değerin eklemek
      virtuals: true,
      transform: function (doc, ret) {
        delete (ret as any)._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// ticket verisini yönetmek için model oluştur
// eğer daha önceden oluşturulan bir ticket modeli varsa yenisini oluşturmak yerine onu kullan
const Ticket = mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
