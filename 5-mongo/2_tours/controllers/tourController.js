import Tour from "../models/tourModel.js";
import { createOne, getAll, getSingle } from "./handlerFactory.js";



// günün fırsatları için filtrelemeleri ayarlayan yalancı kontrolcü
// getAllTours'a atılan istek eğer boşsa(filtreleme sortlama vs. yoksa)
// kullanıcının en çok isteyebileceği fırsatları getiren bir sorgulama oluştur

// TODO - query objesi boş geliyor, query.sort da undefined oluyor. ------------------------------------
export const aliasTopTours = async (req, res, next) => {

    req.query.sort = "-ratingsAverage,-ratingsQuantity";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    req.query['price[lte]'] = 1200;
    req.query.limit = 5;

    console.log("alias'ın sorgusu:", req.query.sort)

    next();
}





export const getAllTours = async (req, res) => getAll(Tour, req, res)

export const getSingleTour = async (req, res) => getSingle(Tour, req, res)



// todo -> handlerFactory ile create komutunu da standart hale getir
export const createTour = async (req, res) => createOne(Tour, req, res);

// ---------------- AGGREGATION CONTROLLERLARI


// getTourStats: Zorluk seviyesine göre tur istatistiklerini hesapla

export const getTourStats = async (req, res) => {

    // MongoDB'nin Aggregation Pipeline (Raporlama Hattı) özelliği ile istatistik hesabı yapalım

    // 1. adım middleware'de koyduğumuz premiumları silen adım olacak
    const stats = await Tour.aggregate([

        // ortalama ratingi 4.0'a eşit veya yüksek olanlar dursun, geri kalanı diziden atılsın.
        {
            // 4.0 değil ortalamanın üstünü getir
            $match: { ratingsAverage: { $gte: 4.0 } }
        },
        // 2. Adım: Turları zorluk seviyesine göre grupla ve istatistikleri hesapla
        {
            $group: {
                _id: "$difficulty", // zorluk seviyesine göre grupla - ÖNEMLİ, grupların neye göre ayrılacağını ve kaç grup olacağını bu alan (difficulty) belirliyor

                count: { $sum: 1 }, // her grupta kaç tur var say (her tur için sum değerine 1 ekle)
                avgRating: { $avg: "$ratingsAverage" }, // ortalama puan hesabı
                avgPrice: { $avg: "$price" }, // ortalama fiyat hesabı
                minPrice: { $min: "$price" }, // bu gruba dahil turlardaki en düşük fiyatı al
                maxPrice: { $max: "$price" } // bu gruba dahil turlardaki en yüksek fiyatı al
            },
        },
        // 3. Adım: Ortalama fiyata göre artan şekilde sırala
        { $sort: { avgPrice: 1 } },

        { $match: { avgPrice: { $gte: 500 } } }
    ]);

    console.log("İstatistik başarıyla hesaplandı: ", stats)


    // JSON cevabı döndür

    res.status(200).json({
        success: true,
        message: "Rapor oluşturuldu.",
        data: stats
    })

}



// getMonthlyPlan: Yıla göre her bir ay için tur istatistiği hesaplayalım

export const getMonthlyPlan = async (req, res) => {

    // Parametrelerden yıl değerini al ve Number formatına çevir
    const year = Number(req.params.year);

    // Mongo Aggregation Pipeline ile istatistik hesaplayalım

    const stats = await Tour.aggregate([


        // 1. Adım => Unwind
        // startDates dizisini açarak her ayrı tarihi ayrı bir belge haline getir
        // bu sayede bir tur birkaç farklı ayda yapılıyorsa her bir ayın istatistiğini etkileyebilsin.
        {
            $unwind: {
                path: "$startDates"
            }
        },

        // 2. Adım => Yalnızca belirtilen yıl içinde gerçekleşen turları seç
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`), // parametrede belirtilen yılın başından
                    $lte: new Date(`${year}-12-31`) // sonuna kadar olan verileri al
                }
            }
        },

        // 3. Adım: Turları aylara göre gruplandır ve istatistikleri hesapla
        {
            $group: {
                //$month => date tarzındaki veriden sadece ay bilgisini alır
                _id: { $month: "$startDates" }, // ay bazında grupla
                count: { $sum: 1 }, // her bir tur için toplam tur sayısına 1 ekle (turlarımı say)
                tours: { $push: "$name" },
                avgRating: { $avg: "$ratingsAverage" },
                avgPrice: { $avg: "$price" }
            }
        },

        // 4. Adım => gruplandırma yaparken _id olarak gruplara ayırmamız gerekir,
        //  fakat kullanıcıya bu şekilde göndermek güzel gözükmez o sebepten _id alanını "month" alanı ile değiştiren

        {
            $addFields: {
                month: "$_id"
            }
        },

        // 5. Adım => artık month değerimiz ay verisini tutuyor, yani _id'ye ihtiyacımız yok.
        // _id'yi kaldırıp gereksiz veriyi temizliyoruz

        {
            $project: {
                _id: 0
            }
        },

        // 6. Adım => Aylara göre artan sıralama yap
        {
            $sort: { month: 1 }
        }
    ]);


    res.status(200).json({
        success: true,
        message: "Ay bazında yıllık rapor oluşturuldu.",
        data: stats
    })

}