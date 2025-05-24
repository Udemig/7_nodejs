// isteğimizin body kısmındaki veriye erişebilmek için parçalanmış halde gelen bütün chunkları(parçaları)
// birleştirmemiz gerekir ve sonrasında çağrılan yere return etmemiz(geri döndürmemiz) gerekir.


const bodyParser = (req) => {

    return new Promise((resolve,reject)=>{

        try {

            let body = "";

            // frontendden bodynin her parçası geldiğinde bu parçayı al ve yukardaki body stringinin sonuna ekle

            req.on("data",(chunk)=>{
                // bodynin sonuna şuanki chunkı(parçayı) ekle
                body += chunk
            });

            // eklemeler bitince json verisini js'e çevir

            req.on('end',()=>{
                //fonksiyonun çağrıldığı yere bodyi return et
                resolve(JSON.parse(body));
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = bodyParser;