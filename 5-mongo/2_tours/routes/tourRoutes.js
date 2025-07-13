import express from 'express'
import Tour from '../models/tourModel.js';
import { getAll } from '../controllers/handlerFactory.js';
import { getAllTours } from '../controllers/tourController.js';
import formatQuery from '../utils/formatQuery.js';


const router = express.Router();


// bütün turları all
router.get('/', formatQuery ,getAllTours)

// yeni tur oluştur
router.post('/', async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        return res.status(201).json({ message: "Yeni tur oluşturuldu", success: true, data: newTour });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
})







// spesifik bir turu al
router.get('/:id', (req, res) => {

    return res.send('spesifik turu alma isteği attınız.')
})


export default router;