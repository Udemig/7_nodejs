const defaultRequest = (req,res) => {

    // cevabın durum kodunu belirleyelim
    res.statusCode = 404;

    // cevabın içeriğini belirleyelim

    res.write(JSON.stringify({ success:false ,message: "Attığınız istek türüne izin verilmiyor."}))

    //cevabı gönder

    return res.end();
}

module.exports = defaultRequest;