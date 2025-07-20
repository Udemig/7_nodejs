import { model, Schema } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Kullanıcı isim değerine sahip olmalıdır / User must have username.']
    },
    email: {
        type: String,
        required: [true, 'Kullanıcı email değerine sahip olmalıdır. / User must have email value.'],
        unique: [true, 'Bu eposta adresine ait kayıtlı bir hesap bulunmaktadır / There is already an account using this email.'],
        validate: [validator.isEmail, 'Lütfen geçerli bir email giriniz. / Please enter a valid email.']
    },
    photo: {
        type: String,
        default: 'defaultpic.webp'
    },
    password: {
        type: String,
        required: [true, 'Kullanıcı şifre değerine sahip olmalıdır. / User must have a password.'],
        minLength: [8, 'Şifre en az 8 karakter olmalıdır. / Password must include at least 8 characters.'],
        validate: [validator.isStrongPassword, 'Şifreniz yeterince güçlü değil. / Your password is not strong enough.']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Lütfen şifrenizi doğrulayın. / Please confirm your password.'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Şifreleriniz eşleşmiyor. / Your passwords don't match."
        }
    },

    role: {
        type: String,
        enum: ['user','guide','lead-guide','admin'],
        default: 'user'
    },

    active: {
        type: Boolean,
        default: true
    },


    // şifre değiştirilme tarihini tutuyoruz ki, bunu kıyas ederek halihazırda giriş yapılmış bütün sistemlerden çıkış yapabilelim
    passChangedAt: Date,

    // şifreyi değiştirmeye yarayan tokeni tut
    passResetToken: String,

    // şifre değiştirme tokeninin geçerlilik süresini(tarihini) de tutarız.
    // Bu genelde yaklaşık 10-15dk geçerli olur
    passResetExpires: Date,
})


// ----------------------------------MIDDLEWARELER

// Sadece kullanıcı kayıt olurken şifreleri kıyaslamak için gerekli olan ve sonrasında ihtiyacımızın kalmadığı "passwordConfirm" değerini kullanıcıyı kaydetmeden önce silen middleware

// .pre => içine girdiğimiz eylem olmadan ÖNCE anlamına gelir.

// şifreyi veritabanına saklamadan önce hashle ve saltla middleware'i
userSchema.pre('save',async function(next){

    this.passwordConfirm = undefined;

    // şifreyi hashle ve saltla
    this.password = await bcrypt.hash(this.password, 12);

    next();
})


// şifre değiştiğinde değiştirme tarihini güncelle

userSchema.pre('save', async function(next){

    // eğer şifre değiştirilmediyse veya kullanıcı ilk kez oluşturuluyorsa hiçbir şey yapma ve geç
    if(!this.isModified('password') || this.isNew) return next();


    // eğer şifre değiştirildiyse değişim tarihini güncelle
    // şuanki tarihten 1 saniye öncesi olarak ayarla

    this.passChangedAt = Date.now() - 1000;

})




// --------------------------------- METHODLAR





// METHOD => Mongo veri şemasındaki veri tiplerinin kendi içlerinde çalıştırılabilen fonksiyonlara method deriz.
// Örn .createResetToken() methodu User modelinde çalıştırılıp sırf o kullanıcı için bir reset token oluşturabilir.

userSchema.methods.createResetToken = function () {

    // şifre sıfırlama tokeni oluşturan ve döndüren fonksiyon


    // 1) 32 byte'lık rastgele bir string oluşturup bunu daha da karmaşık olması hex tarzında bir yazıya dönüştür

    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2) Tıpkı şifreyi hashlediğimiz gibi şifre resetleme tokenini de hashliyoruz ve kullanıcıya kaydediyoruz, çünkü buna erişim sağlayan bir hacker hesabımızı çalabilir

    this.passResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // 3) reset tokeninin son geçerlilik tarihini veritabanına kaydet (15dk)

    this.passResetExpires = Date.now() + 15 * 60 * 1000;

    // tokenin normal halini fonksiyonun çağrıldığı yere döndür
    return resetToken;


}



// şifre doğrulama metodu (method sadece model üzerinden erişilebilir)

// normal şifreyle hashlenmiş şifreyi kıyas eden bir method oluşturalım

userSchema.methods.correctPass = async function (pass, hashedPass) {

    // iki şifre birbiriyle eşleşiyorsa true, eşleşmiyorsa false döndür
    return await bcrypt.compare(pass, hashedPass)
}



// kullanıcı modeli (bu objeyi kullanarak eleman alma, yükleme, güncelleme, silme her şeyi yapabiliriz)
const User = model('User', userSchema);

export default User;