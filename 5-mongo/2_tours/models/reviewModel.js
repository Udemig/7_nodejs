import { model, Schema } from "mongoose";
import Tour from './tourModel.js'

const reviewSchema = new Schema({

    // inceleme yazısı
    review: {
        type: String,
        required: [true, 'Yorum içeriği boş olamaz.']
    },

    // tura kullanıcı tarafından verilen puan
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: [true, "Puan değeri tanımlanmalı."]
    },
    // ------------------------------------------------- POPULATE REFERENCES
    // incelemeyi atan kullanıcı
    user: {
        // veri tipi objectID olarak tutuldu, çünkü mongo dökümanlarının idsi objectid türündedir, string değildir
        type: Schema.ObjectId,
        // user objesi User koleksiyonundan bir döküman olduğu için, bu objectIDye istek attığımızda hangi koleksiyondan veri araması gerektiğini ref kullanarak veriyoruz.
        ref: "User",
        // incelemeyi atan bir kullanıcı olması ZORUNLUDUR
        required: [true, "İncelemeyi atan bir kullanıcı IDsi zorunludur."]
    },

    // İnceleme hangi turla alakalıysa ona bir gönderme(referans/atıf) yapıyoruz.
    tour: {
        type: Schema.ObjectId,
        ref: "Tour",
        required: [true, "İncelemenin hangi tur için yapıldığını belirtin."]
    },
    // -----------------------------------------------------

    anonymous: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
)



// -------------------------------------- POPULATE MIDDLEWARE

reviewSchema.pre(/^find/, function (next) {
    // id olarak tutulan user'ı gerçek user'ın isim ve foto verisiyle değiştir AMA anonim ise değiştirme
    if (!this.anonymous) {

        this.populate({
            path: "user",
            select: "name photo _id"
        })

    } else this.user = undefined;

    // id olarak tutualn tour stringini(objectid) gerçek tour verisiyle değiştirmek için populate işlemi
    this.populate({
        path: "tour",
        select: "name price"
    })

    next();
})
// ---------------------------------------

// ------------- COMPOUND INDEX (BİLEŞİK İNDEX) ---------

// bir kullanıcının istediği kadar inceleme oluşturabilmesini isteriz.

// fakat aynı turla alakalı birden fazla inceleme oluşturabilmesini istemeyiz.

// iki ayrı referans arasında bir limit oluşturabilmek için, compound index belirleriz.

// aynı tura / aynı kullanıcıdan    / birden fazla istek atılamaz
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });


// ---------------------------------------------------------------


// Her bir Tour ile alakalı Review atıldığında Tour'un rating sayısını ve ortalama puanını 
// hesaplayıp güncelleyen bir fonksiyon yazalım

// statics => şemanın kendisine ait fonksiyonlara denir
reviewSchema.statics.calculateAverage = async function (tourId) {

    // aggregate kullanarak istatistik hesaplama yapabiliriz.

    const stats = await this.aggregate([

        // 1) parametre olan tourId ile eşleşen bütün incelemeleri (o tura atılan bütün incelemeleri) alalım.
        { $match: { tour: tourId } },

        // 2) toplam inceleme sayısını ve sayıların ortalama değerini hesapla

        {
            $group: {
                // tur bazında gruplama yap
                _id: "$tour",
                // toplam kaç yorum olduğunu say
                nRating: { $sum: 1 },
                // rating alanının ortalamasını hesapla
                avgRating: { $avg: "$rating" }
            }
        }
    ])

    console.log("TUR İSTATİSTİKLERİ: ", stats)

    // tura atılan yorum varsa hesaplanan istatistikleri tur belgesine kaydet, yoksa varsayılan bir değer kaydet

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating
        })
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: 3,
            ratingsQuantity: 0
        })
    }

}



// yukarıda sadece fonksiyonu belirledik(define ettik) şimdi ise ne zaman çalışacağını söylememiz lazım

//1)  her bir yeni inceleme kaydedildiğinde çalıştır
reviewSchema.post('save', function () {
    Review.calculateAverage(this.tour)
})


//2) silinme veya güncelleme işlemlerinde de çalıştır

reviewSchema.post(/^findOneAnd/, async function () {

    // findOneAnd ile başlayan metodlar Mongo'nun yeni sürümünde işlem bittikten sonra bize parametre olarak güncellenmiş dökümanı vermedikleri için, güncellediğimiz dökümanı kendimiz manuel bulmamız gerekiyor

    // bunu yapmak için de fonksiyonun çağrıldığı yerde girdiğimiz id değerini this.getFilter() ile alıyoruz.
    const document = await this.model.findOne(this.getFilter());
    console.log("Güncellediğimiz döküman: ", document);

    if (document) {
        await Review.calculateAverage(document.tour._id);
    }
})







// reviewSchema taslağını kullanarak yeni bir model(databasede ayrı bir kısım) oluşturuyoruz.
const Review = model('Review', reviewSchema);

// başka yerlerde modele erişebilmek için export ediyoruz
export default Review;