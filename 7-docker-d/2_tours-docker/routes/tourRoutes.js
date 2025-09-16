import express from 'express'
import Tour from '../models/tourModel.js';
import { getAll } from '../controllers/handlerFactory.js';
import { aliasTopTours, createTour, getAllTours, getMonthlyPlan, getSingleTour, getTourStats } from '../controllers/tourController.js';
import formatQuery from '../utils/formatQuery.js';
import { protect, restrictTo } from '../controllers/authController.js';


const router = express.Router();

//                  ÖZEL METODLAR (İSTATİSTİK, ADMİN VS.)
// ---------------------------------------------------------------

// tur istatistiklerini gönderen routelar
// Gerçek Senaryo: Admin panelinde zorluğa göre tur istatistiklerini gösteren sayfa bu endpointe istek atabilir.

router.route('/tour-stats').get(protect, restrictTo('admin'), getTourStats);

// Gerçek Senaryo: Admin panelinde ay bazında yıllık istatistikler lazım olabilir, bunları gönderen endpointi yazdık

router.route('/monthly-plan/:year').get(protect, restrictTo('admin'), getMonthlyPlan);








//                  STANDART METHODLAR
// --------------------------------------------------------

// En yüksek ortalama ratinge ve inceleme sayısına sahip 5 turu gönderen endpoint
//NOT: Kullanıcı doğru parametreleri oluşturup istek atarsa zaten aynı cevabı alabilir fakat parametre sayısı çok olduğundan frontende kolaylık olması açısından bazı sorgulamaları backendde kendimiz endpoint haline getiririz.

router.route('/top-tours').get(aliasTopTours, getAllTours);


// bütün turları all
router.get('/', protect, formatQuery, getAllTours)

// yeni tur oluştur

// sadece adminler yeni tur oluşturabilir.
router.post('/', protect, restrictTo('admin'), createTour)







// spesifik bir turu al
router.get('/:id', protect, getSingleTour)


export default router;