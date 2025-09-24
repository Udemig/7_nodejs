# Routing

- Next.js'de güncel sürümde önerilen routing yöntemi `App Router`'dır ama next.js 13 sürümü öncesinde `Pages Router` kullanılır.

# App Router

- React projelerindeki react-router-dom kütüphanesiyle yaptığımız sayfalamayı next.js'in kendine has app router yöntemiyle yaparız.
- Dosya dizinine göre / klasör tabanlı sayfalama yapılır.
- Bir sayfa oluşturmak için app klasörü içerisinde o sayfanın adına sahip bir klasör oluşturmalıyız
- Oluşturduğumuz klasörün içerisine `page.jsx` dosyası oluşturmalıyız
- `page.jsx` dosyası içerisine bir react component'ı oluşturup export etmeliyiz
- Next.js bu sayfayı tespit edip otomatik olarak kendi router'ına ekler

# Nested Routes - İç İçe Yollar

- örn:
- /profile > profilini görüntüle
- /profile/friends > arkadaşlarını görüntüle
- /profile/edit > profilini düzenle

# Link - Yönlendirme

- Next.js'de kullanıyıyı linkler aracılığıyla yönlendirmek için Link component'Inı kullanırız
- `href` propu ile yönlendiriceğimiz adresi belirleriz

# Dynamic Routes - Dinamik Yollar

- Detay sayfalarında url'deki paramatrelere erişmek için kullanılır
- products/10 % videos/aksnjı123 & cars/m4
- Bir dinamik route tanımlamak için klasör oluşturuken ismini [] içerisinde yazarız
- Component ise bu parametreye prop aracılığıyla erişir

- /products/1
- /products/2
- /products/3
- `/products/[id]`

# Catch All Segments - Birden fazla parametreye erişme

- Bir route'da birden fazla parametre olduğunda dynamic routes yönteminden farklı olarak bu yolu kullanırız.
- Bu yöntemde parametre sayısı belirsiz olduğu için parametreler her zaman bir dizi içerisinde gelir

- /docs/belge-1
- /docs/belge-1/sayfa-4
- /docs/belge-1/sayfa-4/satir-15
- `/docs/[...slug]`

# Not-Found - 404 Sayfası

- Bir 404 sayfası oluşturmak için tek yapmamız gereken app klasörü içerisinde `not-found.js` isimli bir dosya oluşturmamız yeterli.
- Next.js'in varsayılan bir 404 sayfası var ama istersek bu yöntemle özelleştirebiliriz.
- Kullanıcı, projede mevcut olamayan route'lara girmeye çalıştığında otomatik olarak devreye girer.
- Eğer bir kullanıcıyı bu sayfaya yönlendirme kistersek `notFound()` fonksiyonu çalıştırmamız yeterli

# Route Group - Sayfa Gruplandırma

- Proje içerisindeki sayfaları daha erişilebilir olması için kategorilerine göre gruplandırmak isteyebiliriz
- Ortak layout'a sahip olucak sayfaları aynı route grubu içerisine almak isteyebiliriz.
- Normal klasörleri url'i etkileyiceği için sayfaları gruplandırmak için kullanmak istemeyiz

- /auth/signup > auth ismi url'e etki eder
- /(auth)/signup > auth ismi url'i etkilemez

# Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynı / ortak elementleri / yetkilendirme durumunu belirlemek için kullandığımız bileşendir

- Bir sayfa grubunun veya projedeki bürün sayfaların ortak kullanacığı bileşenleri layout'da tanımlayıp kod tekrarını önleyebiliriz

- Layout klasörü oluşturduğumuz konuma bağlı olarak etkileyeceği sayfa sayı değişir
- Eğer app klasörü içerisine oluşturursak (RootLayout) bütün sayfalara etkiler
- Eğer bir route grubu içerisine oluşturursak sadece o route grubundaki sayfalara etki eder

- Layout component'ları ekrana basılcak olan sayfaları children propu olarak alır bundan dolayı birer HOC'lardır.
- Dosya ismi mutlaka `layout.jsx` olmalıdır

# Template

- Layout ile aynı özelliklere sahiptir sadece sayfa geçişlerinde state sıfırlanır

# Metadata

- Next.js'de react'dan farklı olaka her sayfaya özgü ayrı metadalar tanımlanabilir
- Bu sayede next.js projeleri seo açısından çok daha iyi olur
- Sayfaların tarayıcıda öne çıkması için tanımladığımız meta özelliklerini (title,description,keywords) react tarafından bütün sayfalara ortak sabit şekilde tanımlanırken next'de her sayfaya özgü ve istersek dinamik şekilde tanımlayabiliriz.
- Bir sayfanın metadatasını tanımlamak istiyorsak o sayfada bir `metada nesnesi` export etmeliyiz
- `generateMetadata` fonksiyonu compoent'ın aldığı propların hepsini parametre olarak alı bu parametrelerden yola çıkarak ürünün bilgilerine göre metadatayı düzenleyebiliriz.

# Özel Dosyalar

- `page.jsx` > sayfa tanımlar
- `layout.jsx` > sayfa düzeni tanımlar
- `template.jsx` > sayfa düzeni tanımlar
- `not-found.jsx` > 404 sayfası tanımlar

- `loading.jsx`
- - bir bileşen await ile promise'i beklediği süre boyunca otomatik olarak ekrana gelir
- - dosyayı oluşturduğumu konum loading elementinin sayfanın neresinde ekrana basılacağını belirler
- - oluşturduğumuz klasördeki layout component'ında children nerede ekrana basılıyorsa loading orada ekrana gelir

- `error.jsx`
- - bir bieleşnden throw ile hata fırlatıldığında otomatik olarak ekrana gelir.
- - loading gibi oluşturulduğu bağlı ekrana geldiği konum değişir
- - `use client` kullanmak zorunlu
- - `hata verilerini` ve `sayfayı yeniden render etmeye yarayan fonksiyonu` prop olarak alır

# Import

- Bir içeriği import ederken next.js'de 2 farklı yöntem bulunur.

## Relative Import

- import ediceğimiz dosyaya bulunduğumuz dosyanın konumuna göre `../../` ifadesiyle erişiriz

## Absolute Import

- bir dosyayı import ederken bulunduğumuz dosyanın konumu önemsizdir
- `@/` buradaki @ işareti src klasörünü baz alır
- bu sayede import ederken src klasörünüden itibaren import ederiz bulunduğumuz klasörün konumunun bir önemi kalmaz
- bu yöntemde dosya konumunu değiştirince import yolunu güncellemeye gerek kalmaz
