const bodyParser = require("../utils/bodyParser");
const crypto = require('crypto');
const fs = require('fs')

//bodynin içinde olması gereken verileri tutmamız lazım
const keys = [
    "title",
    "year",
    "rating",
    "description",
    "director",
    "duration",
    "language"
];

const postRequest = async (req, res) => {


    // req.body => direkt erişilemez çünkü body tek bir nesne değil parça parça yollanan veriler bütünüdür.
    // backende parça parça gönderilen puzzle tarzındaki veriyi tekrar birleştirmek gerekir.

    if (req.url === "/api/movies") {

        // parça parça gelen bodyi birleştir
        const body = await bodyParser(req);

        // gelen veriyi kontrol et
        console.log(body)

        

        // const eksikKey = keys.find((key)=>!body[key])

        if (!body.genre.length > 0 || !body.cast.length > 0){
            return res.end("Genre ve cast dizileri boş olamaz.");
        }

        
        
        const eksikKeyler = keys.filter((key) => !body[key]);

        if (
            eksikKeyler.length > 0
        ) {

            eksikKeyler.join(',');

            res.end(`${eksikKeyler} değerleri boş bırakılamaz.`);
            return;
        }


        // kaydedeceğimiz veriye id ekliyoruz.

        body.id = crypto.randomUUID();

        // json dosyasından verileri al
        let data = fs.readFileSync('./data/movies.json','utf-8');

        // JSON'dan JavaScript okunabilir formata çevir.
        data = JSON.parse(data);

        // mevcut filmlerin üstüne yeni filmi ekle
        data.push(body);

        // json dosyasını güncelle (yeni diziyi üzerine yaz)

        fs.writeFileSync('./data/movies.json', JSON.stringify(data));


        //clienta cevap gönder
        res.writeHead(201);
        return res.end(JSON.stringify(body));

    }
    
    return res.end("Geçersiz bir yola POST isteği attınız.")
}

module.exports = postRequest;