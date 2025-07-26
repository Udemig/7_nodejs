import mongoose, { model, Schema } from "mongoose";
import validator from 'validator';


// veritabanına kaydedilecek bir Tour objesinin gerekliliklerini ve şeklini tanımlamak
const tourSchema = new Schema(
    {
        // Uludağ Gezisi
        name: {
            type: String,
            unique: [true, 'İsim değeri benzersiz olmalı.'],
            required: [true, 'Turun bir ismi olmak zorundadır.'],
            minLength: [5, 'Tur ismi en az 5 karakter olmalıdır.'],
            maxLength: [40, 'Tur ismi en fazla 40 karakter olmalıdır'],
            // validate: [
            //     // validate dizisinin içine, fonksiyonun çağrılmış hali değil, direkt kodu verilir ki kendisi çağırabilsin.
            //     validator.isAlpha, // sadece alfabetik karakterler olduğuna emin olur
            //     'İsimde sadece alfabetik karakterlere yer vardır.'
            // ]
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
            enum: ['easy', 'medium', 'hard', "difficult"]
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

        premium: {
            type: Boolean,
            default: false
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
        // her bir guide(rehberimiz) User koleksiyonundaki bir veriyi(bir kullanıcıyı) işaret eder.
        guides: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    },
    // yukarıda şemanın tutacağı değerleri belirttik, burada ise ek ayarları belirteceğiz.
    {
        // JSON'a çevrildiğinde sanal değerler dahil olsun
        toJSON: { virtuals: true },
        toObject: { virtuals: true}
    }

)




// ------------------------------------------------------------------------------------------------------------
// Virtual Property (Sanal Değer)
// veri tabanında tutmaya değmeyecek fakat yine de kullanıcı istek atarken lazım olacak verileri Virtual Property yani Sanal Değer olarak tutarız, bu sayede veritabanında yer kaplamaz ama veri kullanıcıya gönderilmeden hemen önce veriyi oluşturmuş oluruz ve kullanıcıya göndeririz.

// Örnek: Çok Uzun Bir Gezi İsmi  =>  cok-uzun-bir-gezi-ismi (slug yapısı)
// Üstteki slug yapısını veritabanında tutarsak gereksiz yere yer harcamış oluruz. Çünkü zaten bu slug'ı elde etmek için ihtiyacımız olan name değerine sahibiz. Kullanıcıya göndermeden önce oluştursak yeterli.

tourSchema.virtual('slug').get(function(){
    return this.name.toLowerCase().replaceAll(' ','-')
})



// Örnek 2: Client sayfasında kullanmak için turun dolar değil TL fiyatını istedi. TL fiyat zaten dolar fiyat bilinirse hesaplanabileceği için TL fiyatı veritabanında tutmak yerine sadece kullanıcıya göndermeden önce hesaplasak ve objeye eklesek yeterli

tourSchema.virtual('priceTL').get(function(){

    // istersek bir sabit değer belirleriz, istersek de belirli bir yere istek atıp dolar kurunu öğrenip ona göre gönderebiliriz.
    const USD = 40;

    return this.price * USD
})
// ------------------------------------------------------------------------------------------------------------





// Document Middleware
// middleware, iki olay arasında çalışan fonksiyon

// bir belgenin kaydedilmesinden, güncellenmesinden, silinmesinden ya da okunmasından ÖNCE YA DA SONRA bir işlem gerçeleştirmek istiyorsak Middleware kullanırız.

// Client'tan gelen tur verisinin veritabanına kaydedilmesinden hemen önce kaç saat sürdüğünü hesapla ve veritabanına öyle kaydet
// virtual sadece kullanıcıya gönderilmeden önce veri oluşturup gösterebilirken, Middlewareler kalıcı veriler de belirleyebilir.

tourSchema.pre('save', function(next){

    // VT'ye kaydedilmeden önce duration değerini kullanarak hour'u hesapla ve VT'ye öyle kaydet.
    // duration gün cinsinden, hour ise saat cinsinden süre
    this.hour = this.duration * 24;

    //bir sonraki adıma geçebilirsin
    next();
})

// ------------------------------------------------------
// Aggregate Middleware
// Raporlama işlemlerinden önce ve sonra çalıştırılan middlewarelere verilen genelgeçer isim

// .pre(işlem) => işlem gerçekleşmeden ÖNCE çalışan middleware
tourSchema.pre('aggregate', function(next){

    // premium olan turların rapora dahil edilmemesi için aggregation pipeline'a başlangıç 
    // adımı olarak premiumları çıkartan bir adım eklemeliyiz

    // aggregation (rapor oluşturma) adımına geçmeden önce bütün premiumları rapor dizimden çıkart
    this.pipeline().push({ $match: { premium: { $ne: true } } });

    // bu middleware'in yapacağı işler bitti, bir sonrakine geçebilirsin
    next()

})


// .post(işlem) => işlem gerçekleştikten SONRA çalışan middleware
tourSchema.post('aggregate', function(doc,next){



    console.log("İstatistik hesaplama işlemi bitti.", doc)

    // bu middleware'in yapacağı işler bitti, bir sonrakine geçebilirsin
    next()

})





// POPULATE MIDDLEWARE'I (population)

tourSchema.pre(/^find/, function(next){

    // sorgumuzdaki guides(rehberler) dizisi sadece ID tutuyor,
    // kullanıcıya göndermeden önce bu IDleri gerçek veriye (kullanıcı türü) çevirmek lazım

    this.populate({
        // ID'yi gerçek nesneye çevirmek istediğimiz alan
        path: 'guides',

        // populate işlemi yaparken getirmek istemediğimiz alanları burada belirleyebiliriz
        select: "-password -__v -active"
    })

    // bir sonraki adıma geçebilirsin
    next()
})




const Tour = model('Tour', tourSchema);

export default Tour;