import express from 'express'
import Tour from '../models/tourModel.js';
import { getAll } from '../controllers/handlerFactory.js';
import { createTour, getAllTours, getSingleTour } from '../controllers/tourController.js';
import formatQuery from '../utils/formatQuery.js';
import { protect, restrictTo } from '../controllers/authController.js';


const router = express.Router();


// bütün turları all
router.get('/', protect, formatQuery, getAllTours)

// yeni tur oluştur

// sadece adminler yeni tur oluşturabilir.
router.post('/', protect, restrictTo('admin'), createTour)







// spesifik bir turu al
router.get('/:id', protect, getSingleTour)


export default router;