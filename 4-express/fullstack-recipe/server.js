import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';






// express kurulumu

// express fonksiyonunu çağırarak bir sunucu örneği alırız.

const app = express();

// gerekli arayazılımları (middleware) isteklerimiz routelara GİTMEDEN ÖNCE belirleriz.
app.use(express.json());


// sunucu tarafına endpointleri tanıtmak için ne kadar routerımız varsa hepsini burada use fonksiyonuyla kullanırız.
app.use(recipeRoutes);



// bu uygulamanın kullanacağı portu ayrı bir değişken olarak belirleyebiliriz.
const PORT = 3000;


// aldığımız sunucu örneğini ayağa kaldırıp dinleme moduna alıyoruz
app.listen(PORT, ()=>{
    console.log(`Sunucu ${PORT} portunda çalışmaya başladı.`)
})