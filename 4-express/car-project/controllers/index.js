const fs = require('fs');
const crypto = require('crypto');
const write = require('../utils/write')

console.log(__dirname) // bulunduğumuz klasörün yolu
console.log(__filename) // bulunduğumuz dosyanın yolu

// ------------------------------------

// araba verilerini al
let cars = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/cars.json`, 'utf-8')
)

// arabaları cevap olarakgönder
exports.getAllCars = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Araç verileri alındı.",
        results: cars.length,
        data: cars
    })
}


// ------------------------------------------

// 2) Yeni bir araç ekle

exports.createCar = (req, res) => {

    // express.json middleware'i sayesinde body'e erişebiliyoruz, normal şartlar altında buna erişim sağlayamıyorduk.
    console.log(req.body)

    //id verisi eklenmiş araç verisi
    const newCar = { ...req.body, id: crypto.randomUUID() };

    // yeni aracı diziye ekle
    cars.push(newCar);

    // json dosyasını güncelle
    write(cars);

    res.status(201).json({
        success: true,
        message: "Araba başarıyla eklendi.",
        data: newCar
    })
}



// --------------------------------- ID ILE ATILAN ISTEKLER


exports.getSingleCar = (req, res) => {
    return res.send({
        success: true,
        message: "Aradığınız araba başarıyla bulundu.",
        data: req.car
    })
}


exports.deleteCar = (req, res) => {

    //idsi gelen aracı cars dizisinden kaldır
    cars = cars.filter((car) => car.id !== req.params.id);

    // json dosyasını güncelle
    write(cars);

    res.status(200).json({
        success: true,
        message: "Araç başarıyla silindi."
    })
}

exports.updateCar = (req, res) => {

    // isteğin body kısmında güncellenecek verileri al
    const updates = req.body;

    console.log(req.car);
    console.log(updates);

    // aracın önceki değerlerini alıp, üstüne güncel değerleri koyalım
    const updatedCar = { ...req.car, ...updates }


    // güncellenecek elemanın sırasını bul
    const index = cars.findIndex((car) => car.id == updatedCar.id)

    //dizideki eski aracın yerine yeni aracı koy
    cars[index] = updatedCar;

    // güncellenmiş diziyi yaz
    write(cars);

    res.status(200).send({
        success:true,
        message:"Araba başarıyla güncellendi.",
        data:updatedCar
    })
}