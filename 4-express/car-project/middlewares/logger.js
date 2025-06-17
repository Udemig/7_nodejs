exports.logger = (req, res, next) => {

    console.log(
        `\n
        İSTEK GELDİ ✅ \n
        METHOD: ${req.method} \n
        URL: ${req.url} \n
        `
    )

    // --- Middleware'e manuel olarak bir sonraki fonksiyona geçebilirsin dememiz gerekiyor, 
    // çünkü bunu demezsek isteğimiz middleware'de takılı kalır ve cevap döndüremeyiz

    next();
}