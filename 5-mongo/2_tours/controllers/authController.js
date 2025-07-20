import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import sendMail from "../utils/sendMail.js";
import crypto from 'crypto'


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


    //4) Token verildikten sonra kullanıcı hiç şifre değiştirmiş mi kontrol et

    if (activeUser.passChangedAt) {

        // şifrenin ne zaman değiştirildiğini öğren
        const passChangedSeconds = parseInt(
            activeUser.passChangedAt.getTime() / 1000
        )

        // 20 Temmuz 2025 => 1970 - 2 milyon saniye
        // 21 Ağustos 2025 => 1970 - 2 milyon 100 bin saniye

        // şifrenin değişitrilme tarihi ile jwtnin oluşturulma tarihini sayı cinsinden kıyasla
        // eğer şifre değiştirme tarihi jwt oluşturma tarihinden daha büyükse (jwt oluşturulduktan sonra şifre değiştirilmişse) hata gönder

        if (passChangedSeconds > decoded.iat) {
            return res.status(401).send({
                success: false,
                message: "Yakın zamanda şifreniz değiştirildi, lütfen tekrar giriş yapınız."
            })
        }


    }


    // req.user değerini bulduğumuz kullanıcı olarak belirleyelim ki bir sonraki her istekte tekrar find yapmak zorunda kalmayalım
    req.user = activeUser;

    // eğer bütün bu doğrulamalardan geçersek middleware'i kabul et ve bir sonraki aşamaya geçilmesine izin ver
    next();
}



// ROL BAZLI YETKİ MİDDLEWARE'İ
// örn bazı rotalara sadece adminler/moderatörler erişebilsin, düz kullanıcıların yetkisi olmasın.

export const restrictTo = (...roles) =>
    (req, res, next) => {

        // 1) İzin verilen rollerin arasında mevcut kullanıcının rolü yoksa eğer hata gönder
        // req.user diyerek kullanıcıya erişebiliriz çünkü önceki protect middleware'inde zaten kullanıcıyı almıştık.

        if (!roles.includes(req.user.role)) {
            return res.status(403).send({
                success: false,
                message: "Bu işlem için yetkiniz yok (rol yetersiz.)"
            })
        }

        // 2) Eğer yetkisi var ise middleware'den geçilmesine izin ver

        next();


    }


// ------------------------------------------------------------------------------------
// AUTH FONKSİYONLARI

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



export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt').status(200).json({ success: true, message: 'Oturumunuz kapatıldı.' })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: 'Çıkış yapılırken hata oluştu.',
            data: err
        })
    }
}


// ----------- ŞİFRE UNUTMA FONKSİYONLARI

export const forgotPassword = async (req, res) => {
    try {
        // epostaya göre kullanıcı hesabına eriş

        // 1) veritabanında kullanıcının emailine sahip birisi var mı bak
        const user = await User.findOne({ email: req.body.email })

        // 2) eğer böyle bir kullanıcı yoksa hata gönder

        if (!user) return res.status(404).send({ success: false, message: "Bu mail adresiyle kayıtlı kullanıcı yok." })

        // 3) Şifre sıfırlama tokeni oluştur
        const resetToken = user.createResetToken();

        // 4) güncellemeleri veritabanına kaydedelim ama veri doğrulaması olmadan
        await user.save({ validateBeforeSave: false })

        // 5) tokeni kullanarak kullanıcının şifre sıfırlayabileceği endpointe istek atılacak bir link oluştur
        const şifreSıfırlamaLinki = `${req.protocol}://${req.headers.host}/api/users/reset-password/${resetToken}`

        // 6) oluşturulan linki kullanıcıya mail olarak gönder
        await sendMail({
            email: user.email,
            subject: "Şifre sıfırlama bağlantınız (15dk)",
            text: resetToken,
            html:
                `
            <h2>Merhaba ${user.name}</h2>
            <p>
                <b>${user.email}</b> e-posta adresine bağlı mongotours hesabı için şifre sıfırlama bağlantısı oluşturuldu.
            </p>

            <a href="${şifreSıfırlamaLinki}">${şifreSıfırlamaLinki}</a>

            <p>Yeni şifrenizin içinde bulunduğu bir body ile yukarıdaki bağlantıya <b>PATCH</b> isteği atınız.</p>

            <p><b>Saygılarımızla, MongoTours</b></p>
            `
        })

        // 7) client'a cevap gönder
        res.status(200).send({ success: true, message: "Şifre yenileme e-postanız gönderildi." })

    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

    //TODO: Kullanıcıya özel bir tokene sahip mail gönder
}


export const resetPassword = async (req, res) => {
    try {

        // gelen tokenden yola çıkarak kullanıcıyı bul

        const token = req.params.token;

        // 2) elimizdeki token şifrelenmemiş, ve veritabanında tutulan ise hashlenmiş (şifrelenmiş) olduğu için
        // tokenin doğru olup olmadığını görebilmek adına, elimizdeki tokeni hashleyip ikisini birbiriyle kıyas edeceğiz.

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Veritabanında hashlediğimiz tokene sahip kullanıcı var mı bak 
        // (Token geçerli mi yoksa birisi yalandan rastgele token mi giriyor?)

        const user = await User.findOne({
            // tokenleri uyuşan kullanıcı var mı?
            passResetToken: hashedToken,

            // tokenin bitme tarihi şuanki tarihten daha büyükse(henüz o tarihe gelmediysek) kabul et, geldiysek etme
            passResetExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(403).send({
                success: false,
                message: "Şifre sıfırlama tokeninin süresi dolmuş veya geçersiz."
            })
        }

        // 5) Eğer buraya kadar hiçbir sorun yoksa (kullanıcı varsa, token doğruysa ve süresi geçmemişse
        // kullanıcının bilgilerini artık güncelleyebilirsin.

        user.password = req.body.newPass;
        user.passwordConfirm = req.body.newPass;
        user.passResetToken = undefined;
        user.passResetExpires = undefined;


        // kullanıcıyı kaydet

        await user.save();


        return res.status(200).json({ success: true, message: "Şifreniz başarıyla güncellendi." })

    } catch (error) {


        return res.status(500).send({ success: false, error: error.message })


    }
}

// ------------ ŞİFRE DEĞİŞTİRME FONKSİYONU

export const updatePassword = async (req, res) => {

    // kullanıcı bilgilerini al

    const user = req.user;

    // 1) kullanıcı yoksa ya da hesabı banlıysa hata gönder

    if (!user || !user.active) {
        return res.status(404).send({
            success: false,
            message: "Şifresini değiştirmeye çalıştığınız hesap yok ya da askıya alınmış."
        })
    }

    // 2) gelen mevcut şifreyi teyit et, doğru mu yoksa yanlış mı?

    const passMatch = await user.correctPass(req.body.currentPass, user.password);

    // a) Kullanıcının girdiği şifre ile veritabanındaki eşleşmiyorsa hata gönder.
    if (!passMatch) {
        return res.status(403).send({
            success: false,
            message: "Girdiğiniz mevcut şifre hatalı"
        })
    }

    // 3) doğruysa eğer yeni şifreyi veritabanına kaydet

    user.password = req.body.newPass;
    user.passwordConfirm = req.body.newPass;

    // şifresini güncellediğim kullanıcı modelini kaydet
    await user.save();




    // 4) isteğe bağlı olarak kullanıcıya şifre değişimini bildilendirmek için mail gönderebiliriz

    await sendMail({
        email: user.email,
        subject: "MongoTours Hesap Şifreniz Güncellendi",
        text: "Bilgilendirme E-postası",
        html:
            `
        <h1>Hesap Bilgileriniz Güncellendi.</h1>
        <p>Merhaba, ${user.name}</p>
        <p>Hesap şifrenizin başarıyla güncellendiğini bildiririz. 
        Bu değişiklik size ait değilse lütfen destekle iletişime geçiniz.</p>

        <p>Saygılarımızla</p>
        <p><b>MongoTours Ekibi</b></p>
        `
    })


    res.status(201).json({
        success: true,
        message: "Şifreniz başarıyla değiştirildi, tekrar giriş yapabilirsiniz."
    })

}
