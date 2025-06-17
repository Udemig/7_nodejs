const express = require('express');
// const app = express();

// -------------------------- BASİT İSTEKLER


// app.get('/', (req, res) => {
//     res.send('Ana Sayfa');
// })

// app.get('/hakkinda', (req, res) => {
//     res.send("Hakkında sayfası")
// })

// app.use((req,res)=>{
//     res.status(404).send('Sayfa bulunamadı.')
// })



// ------------------------------- QUERY


// http://localhost:3000/search?q=mutfak+dolabi


// const app = express();

// app.get('/search', (req,res)=>{
//     const arama = req.query.q

//     res.send(`Merhaba, "${arama}" araması yaptınız.`);
//     return
// })

// app.use((req,res)=>{
//     res.send('Hatalı yol.')
// })

// ---------------------------- POST

// const app = express();

// //bodymi parçala (bir işlem çalışmadan önce çalışacak fonksiyonlara middleware(ara işlemci) diyoruz)
// app.use(express.json())

// app.post('/gonder',(req,res)=>{

//     res.send(JSON.stringify({
//         message:'başarılı',
//         data:req.body
//     }))
// })


// ------------------------ MIDDLEWARE

const app = express();

app.use(express.json())

app.use((req,res,next)=>{
    console.log(`"${req.method}" metoduyla - "${req.url}" yoluna bir istek atıldı.`)

    req.body = req.body.message.replaceAll(',',' ')

    next() // bir sonraki fonksiyona geçebilirsin.
})


app.post('/',(req,res)=>{
    res.send(`Merhaba Dünya, VERİ: ${JSON.stringify(req.body)}`)
})




const PORT = 3000;

app.listen(PORT, () => { console.log(`Sunucu ${PORT} portundan istekleri dinlemeye başladı`) })