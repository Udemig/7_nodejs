import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/userRoutes.js';

// Mongo'ya bağlanma komutu
const connectDB = () => {
    return mongoose.connect('mongodb://localhost:27017/intro')
    .then(()=>console.log('MongoDB Bağlantısı Başarılı!!'))
    .catch(err=>console.log('MongoDB bağlanırken hata oluştu.',err))
}

// express sunucu örneği aldık (Henüz çalışmıyor.)
const app = express()

// post isteklerinde body okunabilsin diye kullandığımız bodyparser middleware'i
app.use(express.json())

// userRouter yani user nesnesiyle alakalı bütün istekleri tanıttık
app.use('/api/users',userRouter)



const PORT = 3000;

// bağlanma fonksiyonunu buradan çalıştırıyoruz.
connectDB();

// yukarda örneğini aldığımız express uygulamasını ayağa kaldır ve dinlemeye başla
app.listen(PORT,()=>{
    console.log("Merhaba sunucu ayağa kalktı.")
})