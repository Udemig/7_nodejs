const fs = require('fs')

const deleteRequest = (req, res) => {

    console.log("REQUEST URL:", req.url)

    //url'nin temel kısmını (sondaki parametre hariç) path değişkenine aktar.
    const path = req.url.substring(0, req.url.lastIndexOf('/'));

    // en sondaki id parametresini de değişkene aktar
    const id = req.url.split("/")[3];


    if (path === '/api/movies' && id) {

        // bütün filmleri alalım
        const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

        // bizden istenen id parametresine sahip film var mı bak
        const found = movies.find((item) => item.id === id);

        // eğer bulunan eleman yoksa hata döndür
        if (!found) {
            res.writeHead(404);
            return res.end("Silmek istediğiniz film bulunamadı.")
        }

        // eğer silmek istenen film varsa, o filmi movies'ten çıkart.
        const filtered = movies.filter((item)=>item.id !== id);
        // id'si silmek istediğimiz elemanın id'sine eşit olmayanlar filtered dizisine aktarılır,
        // eşit olansa diziden elenir.


        //filtrelenmiş (istenmeyen eleman çıkarılmış) dizimizi tekrar movies.json'a yazmamız lazım
        fs.writeFileSync('./data/movies.json', JSON.stringify(filtered));


        //clienta cevap gönder
        res.writeHead(200);
        return res.end("Film başarıyla silindi.");
    }


    if(!id){
        res.writeHead(404);
        return res.end("Silmek istediğiniz filmin IDsini belirtin.")
    }

    res.writeHead(400);
    return res.end("Geçersiz istek attınız.");
}

module.exports = deleteRequest;