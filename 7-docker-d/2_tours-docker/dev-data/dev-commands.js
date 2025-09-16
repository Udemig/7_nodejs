// Kod yazma aşamasında sıklıkla veri kaybı yaşayabiliriz veya deneme yanılma yaparken (CRUD) çok fazla veriye ya da çok az veriye sahip olabiliriz. Bu durumda verileri manuel bir şekilde istediğimiz şekle getirmek yerine, bunu kod yazarak otomatik bir şekilde yapılmasını sağlayabiliriz.
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour from '../models/tourModel.js';
import User from '../models/userModel.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';



// Modül yöntemiyle __dirname gibi değişkenlere erişme

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// json dosyasından verileri al

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
// todo: reviewsı da al


// dotenv kütüphanesini çevre değişkenlerine(örn. MONGO URL) erişmek için kuruyoruz.
dotenv.config();


// mongo veritabanına bağlan
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Komut yürütmek için Mongo ile bağlantı kuruldu.'))
    .catch((err) => console.log('Komut yürütmek için Mongoya bağlanırken hata oluştu.', err));


// verilerimizi mongodaki koleksiyonlara aktaracak bir fonksiyon yazalım

const importData = async () => {
    try {
        // tours ve users yani json dosyalarımızda tuttuğumuz verileri Mongo koleksiyonlarına aktar
        await Tour.create(tours, { validateBeforeSave: false });
        await User.create(users, { validateBeforeSave: false });

        console.log("JSON VERİLERİ KOLEKSİYONLARA AKTARILDI")
    }
    catch (err) {
        console.log("JSON AKTARIMI HATA: ", err)
    }

    // bu fonksiyon tamamlandığında terminalin serbest kalması için işlemi sonlandır
    process.exit();
};


// Mongodaki verilerimizi silen fonksiyonu yazalım

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        console.log("Bütün veriler temizlendi.")
    }
    catch (error) {
        console.log(error)
    }

    process.exit();
}

// node ile dosyayı çalıştırırken en sona koyduğumuz bütün yazılar argüman(argv) sayılırlar, bu özelliği kullanarak import mu edeceğiz yoksa veri mi sileceğiz karar verebiliriz.

if(process.argv.includes('--import')){
    importData();
}
else if (process.argv.includes('--delete')){
    deleteData();
}
else{
    console.log('UYARI: Silme ya da ekleme argümanı veriniz!')
    process.exit();
}




