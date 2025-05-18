
// gerekli modülleri çağır
const http = require("http")
const url = require("url")
const fs = require("fs")

// html düzenleme fonksiyonunu import et
const replaceTemplate = require("./modules/replaceTemplate")


// önce şablonları okuyalım ki yazı verisi olarak kullanıcıya gönderebilelim

let overviewHTML =  fs.readFileSync("./templates/overview.html","utf-8");
let cardTemplate = fs.readFileSync("./templates/card.html","utf-8");
let detailTemplate = fs.readFileSync("./templates/product.html","utf-8");


// önce veritabanımızdaki json verisini çekicez
let jsonData = fs.readFileSync("./dev-data/data.json","utf-8");

// okunan JSON stringini, gerçek JavaScript formatına çevir ki kullanabileyim.
const data = JSON.parse(jsonData);



// http modülünden gelen createServer fonksiyonunu çalıştır ve döndürdüğü Server objesini bir değişkene ata

// createServer'ın içine aldığı fonksiyon, sunucumuza istek atıldığında ne yapılacağına karar verir.
// bu fonksiyon request(req) ve response(res) adında iki parametre alır ve bu parametreler kullanıcının attığı isteğe ve kullanıcıya döndürülecek cevaba erişim sağlamamıza yarar.

const server = http.createServer((request, response) => {

    // obje parçalama yöntemi ile gelen linkin .pathname değerini aldık ve pathname olarak tuttuk.

    const { pathname, query } = url.parse(request.url, true)

    console.log("\n\nARANAN ÜRÜNÜN IDSİ:", query, "\n\n")

    // gelen isteğin yoluna göre farklı cevap göndermeliyiz

    switch (pathname) {
        case "/product":
            
        // 1) öncelikle veri dizisindeki kullanıcının istediği elemanı (query'de idsi var) bulmamız lazım

        const item = data.find((item)=>item.id == query.id)

        // eğer query.id'deki aradığım elemanı bulduysam bunu item değişkenine ata sonra da consola bas

        // console.log(item)

        // 2) sonrasında detay sayfasının htmlini (product.html) al ve doğru verilerle replaceTemplate fonksiyonunu kullanarak doldur, sonrasında bu sayfayı kullanıcıya gönder.

        const output = replaceTemplate(detailTemplate,item)

        // bu güncellenmiş html'i kullancıya artık gönderebiliriz

        return response.end(output)

        case "/overview":

            // ürünler dizisindeki kart sayısı kadar kart htmli oluştur

            let cards = data.map( (item)=>{ 
                return replaceTemplate(cardTemplate,item)
            } ).join("")

            overviewHTML = overviewHTML.replace('{%PRODUCT_CARDS%}',cards);

            return response.end(overviewHTML)

        case "/":
            return response.end("<h1>Anasayfaya hosgeldiniz.</h1>")

        default:
            return response.end("<h1>404</h1><h2>Tanimlanmamis Yol.</h2>")
    }




    return response.end(`
            <h1>Sunucuya hoşgeldiniz.</h1>
            <button>MERHABA</button>
        `);

})


// oluşturulan server değişkenini ayağa kaldırmamız gerekir

server.listen(4000, "127.0.0.1", () => {
    console.log("Bu bilgisayarın(sunucunun) 4000 portuna gönderilen istekler dinlenmeye başlandı.")
})