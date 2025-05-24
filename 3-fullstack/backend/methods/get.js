const fs = require('fs');


const getRequest = (req, res) => {

    // url'i / lere göre parçala ve 4. elementi (idyi) al

    const id = req.url.split('/')[3];

    // url'nin başından en son / kullanılan yere kadarki kısmı al ve eğer bu kısım '/api/movies'e eşitse o zaman isteğin filmlere atıldığını anla

    const path = req.url.substring(0, req.url.lastIndexOf('/'));

    // CRUD =>  CREATE (OLUŞTURMAK) READ (OKUMAK)   UPDATE (GÜNCELLEME) DELETE (SİLME)
    //          POST                GET             PUT/PATCH           DELETE 


    // eğer temel url'ye istek atılırsa bütün filmleri al ve gönder

    console.log("path değeri:", path)

    // buraya id ile istek atarsak zaten sonunda /id gibi bir değer olacağı için isteğimiz bu kısıma düşmeyecek.
    if (req.url === "/api/movies") {
        // 1) json dosyasından filmleri oku

        console.log("filmlere istek atıldı")

        // şuan json, yani direkt gönderilebilir
        const movies = fs.readFileSync('./data/movies.json', 'utf-8');

        // clienta cevap gönder
        return res.end(movies);
    }


    // eğer id verilirse istek yukarıdaki bloğa düşmez çünkü req.url formatı /api/movies/12 tarzındadır.
    // bu durumda da yapmamız gereken en sondaki eğik çizgiden önceki kısmı alıp ona göre cevap vermektir.

    if (path === "/api/movies" && id) {
        // eğer en son slashten önceki kısım /api/movies ise ve id değerimiz de varsa 
        // o zaman sadece o IDye sahip filmi göndermemiz gerekir

        // 1) json dosyasından filmleri al ve JavaScript okunabilir formata çevir.
        const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

        // movies dizisinden atılan istekteki ID ile eşleşen filmi bul
        const movie = movies.find((item) => (item.id === id));
        // find'ın içine verilen fonksiyon true döndüğü an, istenen item bulunmuştur.

        if (movie) {
            return res.end(JSON.stringify(movie))
        }

        // son olarak film bulunamazsa hata gönder

        res.writeHead(404);
        return res.end(JSON.stringify({
            success:false,
            message:"Aradığınız film bulunamadı."
        }))

    }


    res.writeHead(404)
    return res.end("Aradığınız yol bulunamadı");
}

module.exports = getRequest;