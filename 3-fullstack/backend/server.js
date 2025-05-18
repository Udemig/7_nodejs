const http = require("http");
const fs = require('fs')
const getRequest = require('./methods/get');




// 1) önce sunucuyu oluştur.

const server = http.createServer((req,res)=>{

    // console.log("İSTEK GELDİ")

    // gelen isteğin methoduna göre farklı cevaplar gönderilsin.

    console.log("İSTEK TÜRÜ:",req.method)

    switch(req.method){
        case "GET":
            return getRequest(req,res); 
        case "POST":
            console.log("Sunucuya POST türünde istek atıldı.");
            return res.end("POST türünde istek attınız.")
        case "DELETE":
            console.log("Sunucuya DELETE türünde istek atıldı");
            return res.end("DELETE türünde istek attınız.");
        case "OPTIONS":
            console.log("Sunucuya OPTIONS türünde istek atıldı.");
            return res.end("OPTIONS türünde istek attınız.");
        default:
            console.log("Sunucuya izin verilmeyen "+ req.method + " metoduyla istek atıldı.")
            return res.end("Sunucu bu istek metoduna izin vermiyor.")
    }

    return res.end("Sunucumuza hoşgeldiniz. Fullstack Movie App.")
})


// 2) oluşturduğun sunucuyu ayağa kaldır

const port = 4080;

server.listen(port,()=>{
    console.log(`Sunucu ${port} portuna gelen istekleri dinlemeye başladı.`)
})