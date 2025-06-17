const express = require('express');
const { getAllCars, createCar, getSingleCar, deleteCar, updateCar } = require('../controllers');
const idControl = require('../middlewares/idControl');


// 1) bütün kodlar anasayfada kalmasın diye endpointleri/routeları ayrı bir dosyaya taşımak için
// bir router örneği alıyoruz, sonrasında isteklerimizi bu routera atılan istekler olarak belirliyoruz.
const router = express.Router();

// routeları/endpointleri tanımla

// -----------------------------------------

// /api/cars tarafına istek atıldıysa

router.route('/api/cars')
    // atılan istek get isteğiyse
    .get(getAllCars)
    // atılan istek post isteğiyse
    .post(createCar);

// /api/cars tarafına ":id parametresiyle" istek atıldıysa



router.route('/api/cars/:id')
    .get(idControl, getSingleCar)
    .patch(idControl,updateCar)
    .delete(idControl,deleteCar)


// server.js'e routerı tanıtmak için export ediyoruz
module.exports = router
