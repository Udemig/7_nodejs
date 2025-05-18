// card html'ini ve ürün bilgilerini parametre olarak alacak
// data.json'dan gelen verileri alıp, değişken olarak tanımlanan yerlere koyacak ve geri döndürecek


const replaceTemplate = (html, data) => {
    // önce bir çıktı oluşturuyoruz, let ile çünkü değişiklik yapıcaz

    // htmlimin içindeki {%PRODUCTNAME%} değişkenini bul ve onu data.json'ımdan gelen ürün ismiyle(havuç, kiraz, avokado vs.) değiştir

    let output = html.replace(/{%PRODUCTNAME%}/g, data.productName);

    // sonrasında aynı işlemi geri kalan bütün özellikler için yap
    output = output.replace(/{%QUANTITY%}/g, data.quantity);
    output = output.replace(/{%PRICE%}/g, data.price);
    output = output.replace(/{%IMAGE%}/g, data.image);
    output = output.replace(/{%ID%}/g, data.id);
    output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, data.description);
    output = output.replace(/{%FROM%}/g, data.from);

    // ürün organik değilse {NOT_ORGANIC} değişkeni yerine .not-organic css classını ekle

    if(!data.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }else{
        // ürün eğer organikse boş string koy
        output = output.replace(/{%NOT_ORGANIC%}/g, "");
    }

    // bu güncellenmiş ve kullanıma hazır html'i geri döndür
    return output;
}

// replaceTemplate ismindeki fonksiyonu diğer dosyalarda kullanabilmek için export etmeliyiz

module.exports = replaceTemplate;

