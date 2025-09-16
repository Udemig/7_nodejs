import express from 'express';
import userRoutes from './routes/userRoutes.js'
import tourRoutes from './routes/tourRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//dotenv kütüphanesini çevre değişkenlerine (environmental variables) eklemek için
dotenv.config()

console.log("DOTENV KÜTÜPHANESİ ÇALIŞTI VE DEĞERLERİ GETİRDİ: ", process.env.MAIL_USER, process.env.MAIL_PASS)


// express sunucu örneğini al
const app = express();

// mongo veritabanına bağlan
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("BAŞARILI!, MongoDB ile bağlantı kuruldu."))
    .catch(err=>console.log("BAŞARISIZ, MongoDB'ye bağlanırken hata oluştu. HATA:", err))


// MIDDLEWARELER
// -------------------------------------------------------------------
//body parse middleware'i
app.use(express.json());

// cookie parse middleware'i
app.use(cookieParser());


// -------------------------------------------------------------------






// ROTALARI uygulamaya tanıt

app.use('/api/users', userRoutes)

app.use('/api/tours',tourRoutes)

// http://localhost:3000/api/users/100





// ----------------------------------

// sunucunun çalışacağı portu belirle
const PORT = 3000;

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`)
})
