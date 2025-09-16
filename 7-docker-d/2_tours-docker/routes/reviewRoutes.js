import express from 'express';
import { protect } from '../controllers/authController.js';
import { createReview, deleteReview, getAllReviews, updateReview } from '../controllers/reviewController.js';




const router = express.Router();



// rotaları belirliyoruz

// /api/reviews

router.route('/')
    .get(getAllReviews)
    .post(protect, createReview);



// :id parametresine sahip rotalar

router.route('/:id')
    .delete(protect, deleteReview)
    .patch(protect, updateReview)




export default router;