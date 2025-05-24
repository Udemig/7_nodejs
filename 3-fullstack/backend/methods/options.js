





const optionsRequest = (req,res) => {

    // frontendden bir post put patch delete vs istek atıldığında bu isteğin kabul edilip edilmediğini 
    // yoklamak için öncesinde bir OPTIONS isteği yollar.


    //Options'a cevap gelmezse istek türünün kabul edilmediğini düşünür ve asıl isteği atmaz.

    // fakat eğer kabul ediliyorsa (headerlarda kabul edilen istek türü belirtilmişse) options'ın ardından asıl isteği atar.

    // hangi isteklere izin verdiğimizi (allow) sorgular.
    res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS");

    // body'e sahip isteklerde JSON tarzında veri gönderebilmemizi sağlar.
    res.setHeader("Access-Control-Allow-Headers","Content-Type");

    res.end();
}

module.exports = optionsRequest;