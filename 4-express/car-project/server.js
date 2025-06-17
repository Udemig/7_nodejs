const express = require('express');
const carRoutes = require('./routes/carRoutes');
const { logger } = require('./middlewares/logger');





// EXPRESS KURULUM

// 1) express fonksiyonunu çağırarak sunucu örneği al
const app = express();

// 2) (isteğe bağlı) portu ayrı bir değişkende tut
const PORT = 3000;

// -----------------------

// Middleware(ara yazılım) => backende gelen istekle döndürülen cevabın arasında çalışan işlemler

// a) isteklerin body/headers/params kısımlarını parse edip kullanılabilir hale getiren middleware

app.use(express.json())

// b) isteklerin türünü ve yolunu loglayan, kendi yazdığımız middleware
app.use(logger)


// -----------------------


// 3) Routerı çek ve sunucu örneğinin routerdan gelen rotaları dinlemesini sağla

app.use(carRoutes)

// 4) aldığımız sunucu örneğini .listen fonksiyonu kullanarak ayağa kaldır.
app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunu dinlemeye başladı.`)
})
