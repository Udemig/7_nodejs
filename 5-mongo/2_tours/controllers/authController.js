import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Token oluşturma fonksiyonu (kullanıcı, bu tokeni bize geri göndererek, giriş yapmış olduğunu kanıtlayacak)
const signToken = (userid) => {
    //jwtyi oluşturma komutu
    return jwt.sign(
        // payload (jwtnin içinde bulunacak veri)
        { id: userid },
        // secret (şifreleme için kullanılacak anahtar yazı)
        process.env.JWT_SECRET,
        // options (son kullanma tarihi vs.)
        {
            expiresIn: process.env.JWT_EXP || "10m"
        }
    )
}


// token oluştur ve client'a gönder ek fonksiyonu
const createAndSendToken = (user, code, res) => {

    // tokeni oluştur (parametre olarak mongoda tutulan userın idsini ver: _id )
    const token = signToken(user._id);

    // JWT göndermenin 2 yöntemi vardır.


    // 2. Cookie olarak göndermek

    res.cookie('jwt', token, {        // 10 dakikayı milisaniye cinsine çeviriyoruz
        expires: new Date(Date.now() + 10 * 60 * 1000),
        // saldırılara karşı güvenli olsun
        httpOnly: true

        // sadece HTTPS protokolünde(güvenli protokol) seyahat eder
        // secure: true
    })


    // 1. yöntem => BODY'den göndermek
    const newUser = user;

    newUser.passwordConfirm = undefined;
    newUser.__v = undefined;

    res.status(code).json({ message: "Oturum açıldı", token, newUser });

}


// ------------------------------------ AUTHORIZATION MIDDLEWARE --------------------------------------------------

// Authorization(Yetkilendirme) Middleware'i
// Client'a bir token gönderdik, ve client'tan beklentimiz bize bu JWT'yi giriş yaptığını ve yetkisi olduğunu kanıtlamak amacıyla
// her istekte geri göndermesidir.

// Auth Middleware'i bu gönderilen tokenin doğru ve geçerli olduğunu kontrol eder:
// 1) Doğru ve geçerliyse bir sonraki istek adımına devam edilmesine izin verir.
// 2) Yanlış ya da geçersizse isteği sonlandırır, bu sayede yetkisiz kimseler sisteme erişim sağlayamaz.



export const protect = async (req, res, next) => {

    // client'tan gelen tokeni al

    // tarayıcılar cookie kullanabilir fakat mobil ve pc uygulamalarının cookie erişimi yoktur dolayısıyla iki yöntemi de kabul etmemiz gerekir
    let token = req?.cookies?.jwt || req?.headers?.authorization;

    // console.log("cookie: ", req?.cookies?.jwt, " header: ", req?.headers?.authorization)

    // 1) Token var mı yok mu kontrol et

    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'JWT gönderilmedi. Lütfen tekrar giriş yapınız.'
        })
    }


    // 2) Token varsa Bearer etiketini çıkart

    if (token.startsWith('Bearer')) {
        // boşluğa göre böl ve 2. kısmı(tokeni al)
        token = token.split(' ')[1];
    }


    // 3) Tokenin geçerliliğini doğrula (zaman aşımı var mı / imza doğru mu )???

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(403).send({ success: false, message: 'Oturumunuzun süresi doldu, lütfen tekrar giriş yapınız.' })
        }
        else {
            return res.status(400).send({ success: false, message: 'Gönderilen tokeniniz geçerli değil, tekrar giriş yapınız.' })
        }
    }

    // 3) token ile IDsi gelen kullanıcının hesabı duruyor mu

    const activeUser = await User.findById(decoded.id);

    // durmuyorsa hata döndür
    if (!activeUser) return res.status(404).send({ success: false, message: 'Veritabanında böyle bir kullanıcı bulunmamaktadır.' })

    // duruyorsa ama kullanıcı yasaklıysa hata döndür
    if (activeUser.active == false) {
        return res.status(400).send({
            success: false,
            message: 'Bu hesap askıya alınmıştır, lütfen destek ile iletişime geçiniz.'
        })
    }


    // req.user değerini bulduğumuz kullanıcı olarak belirleyelim ki bir sonraki her istekte tekrar find yapmak zorunda kalmayalım
    req.user = activeUser;

    // eğer bütün bu doğrulamalardan geçersek middleware'i kabul et ve bir sonraki aşamaya geçilmesine izin ver
    next();
}



export const register = async (req, res) => {
    try {

        // mongodaki User koleksiyonuna bağlan, 
        // yeni bir kullanıcı oluştur, ve oluşan kullanıcıyı bana newUser olarak geri gönder
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });


        // cevap olarak gönderilecek kullanıcının passwordConfirm değerini cevaptan kaldır
        newUser.passwordConfirm = undefined;
        newUser.__v = undefined;


        createAndSendToken(newUser, 201, res)

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'Bir hata oluştu',
            error: err.message
        })
    }
}




export const login = async (req, res) => {

    const { email, password } = req.body;

    // 1) email ve şifre geldi mi kontrol edilsin

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email veya şifre eksik.',
            success: false
        })
    }

    // 2) client'tan gelen email ile kaydolmuş bir kullanıcı veritabanında var mı?

    const user = await User.findOne({ email: email });

    // 2.1) eğer bu email ile kayıtlı bir kullanıcı yoksa hata döndür

    if (!user) {
        return res.status(404).json({
            message: 'Giriş yapmaya çalıştığınız e-posta ile kayıtlı kullanıcı bulunamadı.',
            success: false
        })
    }


    // active değeri false ise yani kullanıcı yasaklıysa veya hesabı askıya alınmışsa hata döndür
    if (!user.active) {
        return res.status(401).json({
            message: 'Bu hesap askıya alınmıştır, lütfen destek ile iletişime geçiniz.',
            success: false
        })
    }


    // TODO hashlenmiş şifre kontrolü
    // kullanıcının gönderdiği ham(hashlenmemiş ve saltlanmamış ) şifreyi saltlayıp ve hashleyip veritabanındaki hash ve salt ile uyumlu mu diye incelememiz gerekiyor

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return res.status(401).json({
            message: 'Girdiğiniz şifre geçersiz.',
            success: false
        })
    }


    // Eğer üstteki bütün kontrollerden geçildiyse o zaman yeni bir JWT oluştur ve kullanıcıya gönder (buna kullanıcı girişi deniyor)
    createAndSendToken(user, 200, res);
}
