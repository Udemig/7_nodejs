const http = require("http");
const fs = require('fs')
const getRequest = require('./methods/get');
const deleteRequest = require("./methods/delete");
const optionsRequest = require("./methods/options");
const postRequest = require("./methods/post");




// 1) önce sunucuyu oluştur.

const server = http.createServer((req,res)=>{

    // console.log("İSTEK GELDİ")

    // gelen isteğin methoduna göre farklı cevaplar gönderilsin.

    console.log("İSTEK TÜRÜ:",req.method)

    switch(req.method){
        case "GET":
            return getRequest(req,res); 
        case "POST":
            return postRequest(req,res);
        case "DELETE":
            return deleteRequest(req,res);
        case "OPTIONS":
            return optionsRequest(req,res);
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