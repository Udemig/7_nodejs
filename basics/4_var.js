const path = require("node:path");


// dosya dizininde kullanılabilecek metodlar

const text = "./data/örnek.txt"

console.log("dirname(): ", path.dirname(text), "\n")  // klasör yolunun ismi
console.log("basename(): ",path.basename(text), "\n") // dosya ismi
console.log("extname(): ", path.extname(text), "\n") // uzantı ismi



const newFilePath = ["/media","photos","profile.png"]

// iki veya daha fazla yolu birleştirmek
console.log("join(): ", path.join(...newFilePath));


// dosyanın mutlak konumunu bul

console.log("resolve(): ", path.resolve("./data/örnek.txt"))

// yolu en basit hale getirme

console.log("normalize(): ", path.normalize("/users/start.txt"))