const fs = require('fs');
// önce json verisini okuyoruz
const movieJson = fs.readFileSync('./data/movies.json', 'utf-8')

// json verisini projemizde direkt kullanamadığımız için önce düz JavaScript formatına çevirmeliyiz
const movieData = JSON.parse(movieJson);

const getRequest = (req, res) => {

    console.log(req.url);

    // url'i / lere göre parçala ve 3. elementi (idyi) al

    const id = req.url.split('/')[3];

    // url'nin başından en son / kullanılan yere kadarki kısmı al ve eğer bu kısım '/api/movies'e eşitse o zaman isteğin filmlere atıldığını anla

    const path = req.url.substring(0,req.url.lastIndexOf('/'));

    switch(path){
        case '/api/movies':
            return res.end("Filmler kısmına istek attınız.");
        case '/api/users':
            return res.end('Kullanıcılar kısmına istek attınız.');
        default:
            return res.end('Bilinmeyen rotaya istek attınız.')
    }



    return res.end("");
}

module.exports = getRequest;