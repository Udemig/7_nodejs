// Modüller: Modül, node.js'in farklı işlemleri tamamlamak için kullandığı kod parçalarına denir.

// FS (FileSystem)
// Node.js modüllerinden bir tanesi
// Sahip olduğu modüller sayesinde dosya sisteminde değişiklikler(Oluşturma, Silme, Okuma, Yazma) ve düzenlemeler yapabileceğiz

// Node.js'te modülleri kullanmak için önce çağırmamız gerekir.

// require => importa benzer, dışarıdan dosya (modül) çekmeye yarıyor.
const fs = require('fs');



// --------------------------------------------------------------

// SENKRON (Sync)
// Senkron bir işlem tamamen tamamlanıncaya kadar, diğer hiçbir kodun çalışmasına izin vermez.
// Dolayısıyla işlem bitene kadar alt satırlardaki hiçbir kod çalışmaz.

// Senkron işlemler özellikle büyük verilerde işlem yaparken kullanıldığında bekleme süresini çok arttırır ve performansı düşürür.
// Bunun sebebi de node.js tek iş parçacığıyla çalıştığından bir senkron işlem devam ederken diğer işlemler beklemeye alınır.


// ******** senkronu nerede kullanırız?
// küçük, basit işlemlerde veya beklemenin kritik olduğu yerlerde kullanırız.


// 1) Dosya Okuma

const text = fs.readFileSync(`./data/örnek.txt`,'utf-8')

// okuduğumuz dosyayı konsolda görelim
console.log(text);


// 2) Dosya Yazma
// Gönderilecek metinin içeriğini hazırlıyoruz

const newText = 'Greyfurtun baya fazla faydası varmış. ' + "Oluşturulma Tarihi: " + new Date().toLocaleDateString()

// // eğer verilen dizinde dosya zaten varsa günceller, yoksa yenisini oluşturup içeriğini belirler.
fs.writeFileSync('./data/output.txt', newText);
console.log("\nDosya yazma işlemi bitti. \n");



// 3) Dosya Silme
fs.unlinkSync("./data/bozuk.txt")
console.log("\nDosya silme işlemi tamamlandı.\n")


// 4) Dizin (klasör) oluşturma.
fs.mkdirSync("challenge");
console.log("\n Klasör oluşturma işlemi tamamlandı. \n");


// 5) Dosya / dizinin (klasörün) ismini değiştirme
fs.renameSync("./data/output.txt","./data/newOutput.txt")
console.log("\n İsim değiştirme işlemi başarıyla tamamlandı. \n")