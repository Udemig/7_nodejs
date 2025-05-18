// FileSystem modülünü projeye dahil ediyoruz
const fs = require("fs")

// fs.readFileSync() kullanarak title.txt'nin içeriğini okuduk ve bu içeriği title(başlık) değişkenimize atadık.
const title = fs.readFileSync("./basics/challenge/title.txt","utf-8")

// fs.readFileSync() kullanarak content.txt'nin içeriğini okuduk ve bu içeriği content(içerik) değişkenimize atadık.
const content = fs.readFileSync("./basics/challenge/content.txt","utf-8")



fs.writeFileSync(`./basics/challenge/${title}.txt`,content);

console.log(`${title} ismindeki dosya başarıyla yazıldı.`)