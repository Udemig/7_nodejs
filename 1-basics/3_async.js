const fs = require("fs");

/*


ASENKRON
    Asenkron işlemler başladığında aynı anda kod çalışmaya başlar ve yürümeye devam eder.
    node.js işlemi arkaplanda yürütür ve tamamlandığında callback function ile sonuç döndürür, bu fonksiyonun içine
    işlemin tamamlandığına dair loglar vs. de konulabilir.

    Asenkron işlemler node.js single-thread yapısından dolayı performansı arttırır çünkü bir işlem devam ederken
    diğer işlemler engellenmeden yürütülebilir.

    // Asenkron nerede kullanılır?

    Performansın önemli olduğu yerlerde ve kullanıcının beklemesini istemediğimiz yerlerde asenkron yöntem kullanmalıyız.
    Büyük dosya varsa yada daha fazla girdi ve çıktı varsa asenkron tercih etmemiz gerekir.

*/

fs.readFile("./data/örnek.txt","utf-8",
    (err,data)=>{
        if(err){
            console.log("\nHata oluştu: \n\n", err)
        }else{
            console.log("\nOkuma işlemi bitti: \n\n",data)
        }
    }
)


fs.writeFile('./data2/output2.txt','7. sezon backendden selamlar',(err)=>{
    if(err){
        return console.log("Yazma işlemi hatalı.",err)
    }else{
        console.log("Yazma işlemi başarıyla tamamlandı.")
    }
})


fs.unlink("./data/bozuk12.txt",(err)=>{
    
    if(err){
        return console.log("silme işleminde hata oluştu:",err)
    }
    console.log("silme işlemi başarıyla tamamlandı.")
})


// Zincirleme işlemler => örn. Okuma işleminin yazma işlemine bağımlı olduğu bir durum

fs.writeFile('./data/newOutput.txt',"merhaba, güncellenmiş yazı budur.",(err)=>{

    if(err){
        return console.log("Dosya yazarken hata oluştu",err);
    }

    // callback => fonksiyon tamamlandığında(hatalı ya da hatasız) çalışacak fonksiyona denir.

    // yukarıda yazdığımız dosyayı oku ve bize gönder (bu ister asenkron ister senkron olabilir)
    const text = fs.readFileSync("./data/newOutput.txt","utf-8");

    // okuduğumuz veriyi konsola yazdır
    console.log("Dosya başarıyla yazıldı ve kaydedildi. \n \n Kaydedilen Dosyanın İçeriği: \n\n ",text);

})