import mongoose, { model, Schema } from "mongoose";
import validator from 'validator';


// veritabanına kaydedilecek bir Tour objesinin gerekliliklerini ve şeklini tanımlamak
const tourSchema = new Schema({

    name: {
        type: String,
        unique: [true, 'İsim değeri benzersiz olmalı.'],
        required: [true, 'Turun bir ismi olmak zorundadır.'],
        minLength: [5, 'Tur ismi en az 5 karakter olmalıdır.'],
        maxLength: [40, 'Tur ismi en fazla 40 karakter olmalıdır'],
        validate: [
            // validate dizisinin içine, fonksiyonun çağrılmış hali değil, direkt kodu verilir ki kendisi çağırabilsin.
            validator.isAlpha, // sadece alfabetik karakterler olduğuna emin olur
            'İsimde sadece alfabetik karakterlere yer vardır.'
        ]
    },

    duration: {
        type: Number,
        required: [true, 'Tur süresi boş bırakılamaz.']
    },

    maxGroupSize: {
        type: Number,
        required: [true, 'Tur maksimum üye sayısına sahip olmalıdır.']
    },

    difficulty: {
        type: String,
        required: [true, 'Tur zorluk değerine sahip olmalıdır.'],
        enum: ['easy', 'medium', 'hard']
    },

    ratingsAverage: {
        type: Number,
        min: [1, "Rating 1'den küçük olamaz."],
        max: [5, "Rating 5'ten büyük olamaz."],
        default: 3.0
    },

    ratingsQuantity: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        required: [true, 'Tur ücret değerine sahip olmalıdır.']
    },

    priceDiscount: {
        type: Number,

        // custom validator => kendi yazdığımız doğrulayıcı

        validate: {
            validator: function (value) {
                // indirimli fiyat(value) normal fiyattan (this.price) 
                // küçükse true döndür( kabul et) değilse false( hata döndür.)
                return value < this.price
            },
            message: 'İndirimli fiyat asıl fiyattan büyük olmamalıdır.'
        }
    },

    summary: {
        type: String,
        maxLength: [200, 'Özet alanı 200 karakteri geçemez.'],
        minLength: [20, 'En az 20 karakter uzunluğunda bir özet yazınız.'],
        trim: true,
        required: [true, 'Tur özet değerine sahip olmak zorundadır.']
    },

    imageCover: {
        type: String,
        required: [true, 'Tur kapak resmine sahip olmalıdır.']
    },

    images: {
        type: [String],
        default: []
    },

    startDates: {
        type: [Date],
        default: []
    },

    createdAt: {
        type: Date,
        default: new Date()
    },

    hour: {
        type: Number,
        default: 1
    },


    // REFERANSLAMA

    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]



})




const Tour = model('Tour', tourSchema);

export default Tour;