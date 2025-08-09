import multer from "multer";
import User from "../models/userModel.js";
import { getAll } from "./handlerFactory.js";
import sharp from "sharp";

// Multer ile dosya yüklemek için :
// 1. Multer'ı import edip multer kurulumu yapmamız gerekir
// 2. Kurulum sırasında oluşturduğumuz metot aracılığıyla dosya yükleme işlemini yapmalıyız

// Multer Kurulumu
// Multer kurulum için bizden dosyaların nereye depolanacağı belirtmemizi ister.Verilen bu dizin neticesinde bize dosya yükleyebilmemiz için gerekli metotudu döndürür.

// Diskstorage kurulumu
// const multerStorage = multer.diskStorage({
//   // Dosyanın yükleneceği dizini belirt
//   destination: function (req, file, cb) {
//     cb(null, "public/images/users");
//   },
//   // Kayıt edilecek dosyanın adı
//   filename: function (req, file, cb) {
//     // Dinamik şekilde dosya uzantısına eriş
//     const ext = file.mimetype.split("/")[1];
//     // Yüklenecek dosya için uniq bir isim oluştur
//     cb(null, `user-${Date.now()}.${ext}`);
//   },
// });

// memoryStorage kurulumu
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

// sharp kütüphanesi ile yüklenecek resimleri düzenleyecek bir fonksiyon
export const resize = (req, res, next) => {
  // Eğer dosya yoksa fonksiyonu durdur
  if (!req.file) return next();

  // İşlem yapılacak dosyanın adını belirle
  const fileName = `${req.user.id}-${Date.now()}.webp`;

  // gelen dosyayı dönüştür
  sharp(req.file.buffer)
    .resize(400, 300) // dosya boyutunu belirle
    .toFormat("webp") // dosya formatını ayarla
    .webp({ quality: 70 }) // kalite ayarı
    .toFile(`public/images/users/${fileName}`); // kayıt edilecek dizini belirle

  // sonraki adımda (updateMe) revize edilen resime eriş
  req.file.path = fileName;

  // devam et
  next();
};

// multer ile dosya yükleyecek fonksiyon
export const uploadUserImage = upload.single("photo");

// Kullanıcının dosya yükleme endpointine istek attığında karşılık verecek fonksiyon
export const updateMe = async (req, res) => {
  // Kullancıya ait değerleri yöneteceğimiz obje
  const filtredBody = {
    name: req.user.name,
  };

  // Eğer kullanıcı resim eklemediyse fonksiyonu durudur
  if (!req.file) return;

  // Eğer kullanıcı resim eklediyse
  filtredBody.photo = req.file.path;

  // Resim yükleyen kullanıcıyı bul ve onun bilgilerini güncelle
  const updatedUsers = await User.findByIdAndUpdate(req.user.id, filtredBody, {
    news: true,
  });

  return res.json({
    message: "Kullanıcı profili başarıyla güncellendi",
    updatedUsers,
  });
};

export const getAllUsers = async (req, res) => {
  try {
    getAll(User, req, res);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, message: "Bir hata oluştu", error: err.message });
  }
};
