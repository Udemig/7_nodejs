import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { login, protect, register } from '../controllers/authController.js';



// bir yönlendirici örneği aldık
const router = express.Router();

// http://localhost:3000/api/users => buraya istek atmış oluyoruz
router.get('/', protect, getAllUsers)

router.post('/login', login)

router.post('/register', register)


export default router;