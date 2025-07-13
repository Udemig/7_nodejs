## JWT

# JWT Yapısı

ey123132.343jgfrt.464jkwe

- JWT üç kısımdan oluşur ve bu kısımlar . ile birbirlerinen ayrılır:

- Header (başlık)
- Payload (yük)
- Signature (imza)

* Header:
* - Algoritma: Tokenin imzalanması sırasında kullanılan algoritmayı belirler ( RSA, HMAC, SHA256 )
* - Tip: Tokenin türü belirtilir ( JWT )

* Payload:
* - Payload token içerisinde taşınacak bilgileri içerir. Bu bilgiler genellikle kimlik bilgileri ya da yetki bilgileri olur( admin )
* - Bu kısma geri kalan ne kullanılacaksa girilebilir, fakat genellikle üstteki iki bilgi girilir.

* Signature:
* - Header ve payload'un doğruluğunu ve bütünlüğünü test etmek için kullanırız.
* - İmza, header ve payload'un birleştirilmesiyle oluşan string'in bir algoritma ve gizli bir anahtar (backendde biz belirliyoruz) kullanarak şifrelenmesiyle elde edilir.


# Hash & Salt

## Hash

- Hash fonksiyonu parola gibi hassas verileri farklı dizilere dönüştüren matematiksel algoritmalardır (RSA, SHA256, HAMC)

- Hash mantığında hashlenmiş bir şey asla geri döndürülemez (tek yönlüdür). Fakat bir veri tekrar hashlenerek aynı hashi elde etmek mümkündür. Dolayısıyla database'de tutulan hashlenmiş veri giriş yaparken kullanılamaz, orijinal veriyi(asıl şifre) bilmek giriş yapmak için gereklidir.

* REGISTER:
* "furkan123" => "123123asdkfgh59!üğ-/_2^+"

* LOGIN:
* "furkan123" => "123123asdkfgh59!üğ-/_2^+"



# Salt

- Hash fonksiyonları aynı girdiler için aynı veriyi ürettiklerinden iki veya daha fazla kullanıcı aynı şifreyi kullanırsa sadece birisinin şifresinin öğrenilmesi aynı şifreyi kullanan bütün kullanıcıların hesabının çalınmasına sebebiyet verebilir.

- Dolayısıyla ekstra bir güvenlik önlemi olarak, aynı hashlerin bile farklı şekilde tutulmasını sağlamak için Hash işleminden sonra Salt işlemi yapılır ve bu sayede aynı şifreler bile veritabanında farklı şekillerde tutulur. Dolayısıyla kaç kişinin aynı şifreyi paylaştığı asla bilinemez.

 ORJ. ŞİFRE =>     HASHLENMİŞ ŞİFRE       =>   SALTLANMIŞ ŞİFRE
"furkan123" => "123123asdkfgh59!üğ-/_2^+" => "asdppwe1230049549#>#$#$½$½§"
"furkan123" => "123123asdkfgh59!üğ-/_2^+" => "1923985#asd954571230sadasdlfdofgf"
