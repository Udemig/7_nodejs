// Filtreleme, Sayfalama, Sıralama ve Alan Limiti gibi özellikleri projede ihtiyacımız olan her yerde kodu tekrar etmeden yazabilmek için ortak bir class oluşturalım.

class APIFeatures {

    constructor(query, params, formattedParams) {
        this.query = query // sorgu (örn. fiyatı 500'den düşük olanlar vs.)
        this.params = params // parametreler (id'si şu olanı getir)
        this.formattedParams = formattedParams // formatlanmış parametreler (middleware'den gelenler olabilir)
    }


    filter() {
        // 1) turlar için sorgu oluştur (filtreleme ile)

        // buradaki formattedParams, bir öncesinde kullanacağımız bir middleware için yapılan bir hazırlıktan ibaret
        this.query = this.query.find(this.formattedParams)

        return this
    }


    sort() {
        // 2) eğer sort ifadesi varsa ona göre sırala eğer yoksa en yeni elemanı başa koy

        //*** todo => orderda asc desc değeri yok onu eklemeliyiz

        if (this.params.sort) {
            // Mongo sortlanacak alanların arasında "," değil " "(boşluk) ister o yüzden değiştiricez
            this.query.sort(this.params.sort.replaceAll(',', ' '));
        }
        else {
            this.query.sort('-createdAt')
        }

        return this
    }


    limit() {
        // 3) eğer fields parametresi varsa alan limitle
        if (this.params.fields) {
            // fields değerine girilen değerler neyse sadece onlar geri döndürülecek, istenmeyen detaylar alınmayacak
            const fields = this.params.fields.replaceAll(',' , ' ');
            this.query.select(fields)
        }

        return this;
    }

    pagination(){
        // 4) pagination - sayfalama
        const page = Number(this.params.page) || 1 // şuan kaçıncı sayfadayız
        const limit = this.params.limit <= 30 ? Number(this.params.limit) : this.params.limit ? 30 : 20 //sayfa başına eleman sayısı
        const skip = (page - 1) * limit // limit çalışmadan önce atlayacağımız eleman sayısı

        this.query.skip(skip).limit(limit);

        return this
    }
}

export default APIFeatures;