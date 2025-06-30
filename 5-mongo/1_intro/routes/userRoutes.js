import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userController.js";



// yeni bir router örneği alıyoruz.
const router = Router()


// IDsiz rotalar. Genel rotaya atılır.
router.get('/', getAllUsers)
router.post('/', addUser)

// IDli rotalar
router.get('/:id', getSingleUser)
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)


export default router;