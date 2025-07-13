import { model, Schema } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';


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
    passResetExpires: Date,
})



// Sadece kullanıcı kayıt olurken şifreleri kıyaslamak için gerekli olan ve sonrasında ihtiyacımızın kalmadığı "passwordConfirm" değerini kullanıcıyı kaydetmeden önce silen middleware

// .pre => içine girdiğimiz eylem olmadan ÖNCE anlamına gelir.
userSchema.pre('save',async function(next){

    this.passwordConfirm = undefined;

    // şifreyi hashle ve saltla
    this.password = await bcrypt.hash(this.password, 12);

    next();
})






// kullanıcı modeli (bu objeyi kullanarak eleman alma, yükleme, güncelleme, silme her şeyi yapabiliriz)
const User = model('User', userSchema);

export default User;