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
* "furkan123" => "123123asdkfgh59!üğ-/\_2^+"

* LOGIN:
* "furkan123" => "123123asdkfgh59!üğ-/\_2^+"

# Salt

- Hash fonksiyonları aynı girdiler için aynı veriyi ürettiklerinden iki veya daha fazla kullanıcı aynı şifreyi kullanırsa sadece birisinin şifresinin öğrenilmesi aynı şifreyi kullanan bütün kullanıcıların hesabının çalınmasına sebebiyet verebilir.

- Dolayısıyla ekstra bir güvenlik önlemi olarak, aynı hashlerin bile farklı şekilde tutulmasını sağlamak için Hash işleminden sonra Salt işlemi yapılır ve bu sayede aynı şifreler bile veritabanında farklı şekillerde tutulur. Dolayısıyla kaç kişinin aynı şifreyi paylaştığı asla bilinemez.

ORJ. ŞİFRE => HASHLENMİŞ ŞİFRE => SALTLANMIŞ ŞİFRE
"furkan123" => "123123asdkfgh59!üğ-/\_2^+" => "asdppwe1230049549#>#$#$½$½§"
"furkan123" => "123123asdkfgh59!üğ-/\_2^+" => "1923985#asd954571230sadasdlfdofgf"

# Şifre Değiştirme

Şifre Değiştirme İki Farklı Yöntemden Oluşur:

## 1. Şifremi Unuttum (Forgot Password)

Kullanıcının şifresini unuttuğu için giriş yapamadığı durumları kapsayan olaydır.
Bu rota protected olmamalıdır çünkü kullanıcı eğer giriş yapabilseydi zaten şifremi unuttum demesine gerek kalmazdı.

1. Bu rotaya atılan istek, kullanıcının kaydolurken girdiği mail adresine özel bir tokene sahip bir e-posta gönderir
2. Bu gönderme işlemini bir SSMP (E-posta Protokolü/Hizmeti) ile yapar, örn. Mailtrap, mailjson.
3. Ardından kullanıcı, özel tokenli linki kullanarak bir PATCH isteği atarak şifresini değiştirme işlemini gerçekleştirebilir.

## 2. Şifremi Değiştirmek İstiyorum (Change Password)

# Dosya Depolama

- Bir projede dosya depolomak için iki farklı yöntem vardır:

1. Dosya Sistemi Üzerinde Depolama

- Bu sistemde harici bir yapıya ihtiyaç duymadan dosyaları proje dizininde tutabiliriz.Bu yöntem daha çok temel düzeydeki fazla dosya yüklenmeyecek projeler için idealdir.

# Avantajları

- Kolay kullanım (direkt sunucuda depolama yapılacağından kolay bir yönetim söz konusudur.)
- Kontrol bizde (dosyanın nasıl depolanacağına biz karar veriyoruz)
- Hızlı (direkt sunucuda depolama olduğundan hızlıca dosya yükleme işlemi yapılır.)
- Ucuz (direkt sunucu üzerinde depolama yaptığımızdan ekstra bir maaliyet yok)

# Dezavantajlar

- Otomatik yedekleme yok
- Ölçekleme yok
- Güvenlik açığı
- Dağıt erişim yok (bu yöntemde sunucu neredeyse dosyalar orada depolanacığından sunucuya erişim zorunludur)

2. Bulut Yapısı Üzerinde Depolama

- Bu sistemde projenin çalıştığı sunucudan bağımsız bir bulut yapısına dosyaları yükleriz.Bu yöntem daha çok fazla dosya yüklenecek kapsam projeler için idealdir.

# Avantajları

- Güvenli depolama
- Otomatik yedekleme
- Ölçekleme
- Kolay bakım
- Dağıtık erişim (bu yöntemde sunucudan bağımsız dünya üzerindeki pek çok ayrı noktada depolama yapılır.Bu durumda kullanıcı en yakın konumdan dosyalarını alır)

# Dezavantajlar

- Ekstra maaliyet (sunucu ücreti haricinde bulut yapısı içinde ekstra ücret ödememiz gerekir)
- Bağımlılık (bir defa bir bulut yapısı kullanıldığında o bulut yapısı ile çalışmak zorunda kalırız)

# Dosya Yükleme Nasıl Yapılır

- Client kısmından dosyaları almak için multer kütüphanesi kullanılır.

- multer ile dosya yükleme sırasında iki farklı yöntem vardır:

1. DiskStorage'da dosyaları depolama:

- Bu yöntemde dosyanın yükleneceği dizini biz belirler ve yükleme yaparız.

2. MemoryStorage'da dosyaları depolama

- Bu yöntemde dosya sunucunun geçici belleğinde tutulur.Bu sayede client kısmından gelen ilgili dosya üzerinde işlemler yapılabilir.

# Dosya Düzenleme

- Yüklenen dosyalarda bazı düzenlemeler yapmak isteyebiliriz.Ör. instagramda kullanıcı resmi olarak 4K yüksek kalitede bir resim yükleseniz dahi gösterilecek resim max. 100X100 boyutunda olacaktır.İşte bu noktada gereksiz yere büyük dosya depolamamak için dosyalar üzerinde düzenlemeler yaparız.Bu düzenle işlemleri içinse sharp kütüphanesi kullanılır.
- Bu kütüphane ile ister dosyanın boyutunu ayarlayabilir istersek dosyayı döndürebilir,blurlayabilir,kalitesini ayarlayabilir,dosya uzantısını belirleyebilir kısacası dosyayı modifiye edebiliriz.
