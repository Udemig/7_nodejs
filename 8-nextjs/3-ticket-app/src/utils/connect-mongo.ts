import mongoose from "mongoose";

// env'deki veritbanı url'i
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// mevcut bağlantıyı tutucağımız nesne
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};

// veritabanına bağlanıcak ve bağlantıyı cache'e atıcak
// fonksiyon tekrar çağrıldığında zaten cache'de bir bağlantı varsa yeni bağlantı kurmak yerine onu kullanıcak
async function connectMongo(): Promise<typeof mongoose> {
  // bağlantı url'i yoksa hata gönder
  if (!MONGO_URI) {
    throw new Error("Lütfen MONGO_URI değişkenini tanımlayın");
  }

  // eğer mevcut bir bağlantı varsa
  if (cached.connection) {
    // mevcut vt bağlantısını döndür ve yeni bağlantı kurma
    return cached.connection;
  }

  // mevcut bağlantı yoksa
  if (!cached.promise) {
    // yeni bir vt bağlantısı oluştur
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }

  // mevcut vt promise'e bağlanmaya çalış
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }

  // mevcut bağlatıyı return et
  return cached.connection;
}

export default connectMongo;
