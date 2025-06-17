const fs = require('fs')


let cars = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/cars.json`, 'utf-8')
)



module.exports = (req, res, next) => {

    // isteğin idsinde gelen arabayı bul
    const searchedCar = cars.find((car) => car.id == req.params.id);

    // eleman bulunamadıysa hata döndür
    if(!searchedCar){
        return res.status(404).send({
            success:false,
            message:"Gönderilen ID'ye sahip araç bulunamadı."
        })
    }

    // ilerki adımlarda çalışacak fonksiyonlar, middlewareler ve requestler,
    //  bu middleware'de bulduğumuz arabaya erişebilsin diye bulduğumuz arabayı isteğe ekliyoruz.
    req.car = searchedCar;


    // bir sonraki fonksiyona/adıma geç
    next();
}