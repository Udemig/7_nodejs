import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { forgotPassword, login, logout, protect, register, resetPassword, updatePassword } from '../controllers/authController.js';
import sendMail from '../utils/sendMail.js';
import User from '../models/userModel.js';
import crypto from 'crypto'


// bir yönlendirici örneği aldık
const router = express.Router();

// http://localhost:3000/api/users => buraya istek atmış oluyoruz
router.get('/', protect, getAllUsers)

// ------ GİRİŞ - KAYDOLMA ROTALARI

router.post('/login', login)

router.post('/logout', logout)

router.post('/register', register)


// ------- ŞİFRE ROTALARI

// kullanıcı şifresini unuttuğunda müracaat edeceği ilk yer bu rotadır.
// BU ROTA ASLA ŞİFREMİZİ DEĞİŞTİRMEZ - SADECE ŞİFRE DEĞİŞTİRME E-POSTASINI GÖNDERİR.
router.post('/forgot-password', forgotPassword)

// furkan@gmail.com






// üstteki rota mailinize bir eposta gönderir, o e-postaya tıklayıp yönlendirildiğinizde
// bu rotaya gönderilirsiniz.
// BU ROTA İSE GERÇEKTEN KULLANICI ŞİFREMİZİ DEĞİŞTİRİR

// bu rotadaki :token parametresinin amacı emaile erişimi olmayan kötü amaçlı kimselerin şifremizi sıfırlayamamasıdır.
// tokenin kendisi sadece emailimize gönderildiği için reset-password rotasına istek atılsa bile doğru token olmadan atılırsa kabul etmeyeceğiz
router.patch('/reset-password/:token', resetPassword)



// --------------------------- ŞİFRE DEĞİŞTİRME ROTASI (ŞİFRE UNUTTUM DEĞİL)


// şifresini hatırlayan bir kullanıcının şifre değiştirme isteği 

router.patch('/update-password', protect, updatePassword)

export default router;