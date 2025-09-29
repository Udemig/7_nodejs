# Parallel Routes

- Parallel Routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisinde ekrana basmaya yarar
- Her sayfa kendi bağımsız yükleme mantığına sahip olur (loading,error)
- @Slot: @ işaret ile tanımlanan ve parallel route olarak ekrana basılan sayfalardır
- Slot olaraka tanımlanan sayfalar layout prop olarak gider.
- Layout üzerinden slot olarak sayfaları aynı anda veya koşullu olarak ekrana basabiliriz.

- - Biz paralal routes ile aynı arayüzü 2-2 normal component oluşturarakda elde edebilirdik
- - Ama normal component'Lar yerine next.js sayfalarını `page.jsx` 'leri ekrana bastık
- - `Page.jsx` otomatik loading/error mekanizmasına sahiptir.
- - `Page.jsx` url'deki parametreleri prop olarak alır
- - `Page.jsx` SSR, SSG, metada, middleware desteğinden faydalanabilirir

# Intercepting Routes

- Önizleme Route'u
- Bir sayfaya yönlendiren linke tıkladığımızda öncelikle bir modal açığ o sayfa detaylarını modal üzerinden gösteriririz. Kullanıcı sayfayı yenilerde bu sefer modal yerine sayfanın kendisi görünür.
- Bu özellik genel olarak ürün/gönderi detay sayfalarında, login/register sayfalarında, form alanlarında karşımıza çıkar.

# Image

- Next.js'de resimleri Image componentıyla ekrana basarsak, next.js resmi renderlamadan önce bir çok optimizasyondan geçirir, boyutunu düşürür, formatına webe uygun hale getirir ve ekrana basar.
- Bu optimizasyon sayesinde resim içerikleri daha hızlı ekrana gelirken bununla birlikte SEO'da olumlu yönde etkilinir

# SSR vs CSR

# Server Side Rendering vs Client Side Rendering

- Client side rendering yöntemi uygulanan bir sayfaya girdiğinizde `js kodu` ve `boş html dosyası` indirisiniz. İndirilen js `kullanıcının cihazında` çalışır, html içeriğini doldurur ardından sayfa ekrana gelir

- Server side rendering yöntemi uygulanan bir sayfaya girdğinizde `js kodu`, `sunucuda` çalışşır ve `html` `sunucuda` oluşur. Oluşan `dolu html dosyasını` client indirir ve sayfa ekrana gelir

### SSR Faydaları

- JS Kodu kullanıcnın cihazında değilde sunucuda çalışıyor olması daha hızlı sonuç üretir, daha kısa sayfa yükleme süreleri oluşur
- SEO açısından dolu html dosyası indirmek çok daha iyidir, bu sayede google'ın robotları sayfa içeriğini boş zannedip sitemizi arama sonuçlarında alt sıralara atmaz

## Nasıl SSR veya CSR kullanırız?

- Next.js'de iki farklı component türü vardır:
- Server Component: İçeriği server'da render edilir.
- Client Component: İçeriği client'da render edilir

- Next.js biz aksini belirtmedikç bütün component'ları `server component` yapar
- Eğer bileşenin üst kısmına `use client` yazarsak `client component` olur.

- Next.js bizden olabildiğince fazla server component kullanmamızı bekler. (Hız | SEO)
- Her component'ı server component yapamıyoruz. Kullanıcı etkileşmi gerektiren (onClick, onSubmit), veya hooks kullanan (useState,useEffect,useParams) durumlarda client component kullanılması zorunludur

- Not: Next.js bizden olabildiğince çok server component kullanmamız istediği için eğer bir sayfa içerisinde kullanıcı etkileşimi gerektiren bir alan varsa bütün sayfayı client component yapmaka yerine ilgili alanı ayrı bir client component yaparız sayfa ise server component kalmaya devam eder.

## İç İçe Kullanım

- Bir server component içerisinde client component yazmakta bir sorun yoktur

- Bir `client component` içerisine `server component'ı` import edip kullandığımız zaman, o server component'da client'a döner

- Bir `client component` içerisine `server component'ı` children propuyla (HOC) aldığımız zaman server component'ın yapısı bozulmaz.

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cache'de tutar ve veriyi çeken fonksiyonu kısa süre içerisinde tekrar çalıştırdığımızda api'dan veriyi tekrar çekmek yeirne önceki istekden gelen ve cache'de tutulan veriyi kullanır.

- Bu sayede:
- - api'dan cevap beklemek gerekmez > daha hızlı
- - api'a gereksiz istekler gitmez > daha az maliyeti
- - büyün oranda redux/context gibi kütüphanelere olan ihytiyacı azaltıyo > daha pratik

- Not: Next.js varsayılan olarak api'dan gelen cevabı cache'de tutar ama bu durum fetch methoduna gönderilecek parametrelerle değiştirilebilir

# Nexts.js Methodları

## useRouter

- sadece `client` component'larda kullanılır.
- proje içerisinde yönlendirme yapmak için kullanılır
- back() | forward() | refresh() | push() methodları vardır

## redirect

- sadece `server` component'larda kullanılır.
- yönlendirme yapmak için kullanılır

## notFound

- hem `server` hemde `client` component'larda kullanılabilir.
- 404 sayfasını ekrana basar

## usePathname

- sadece `client` component'larda kullanılır.
- kullanıcının bulunduğu yolu url'den alır ve döndürür.

## useParams

- sadece `client` component'larda kullanılır.
- url'deki parametrelere erişmemizi sağlar

## useSearchParams

- sadece `client` component'larda kullanılır.
- url'deki parametrelere erişmemizi sağlar

# Form

- Kullanıcnın arrattığı kelimeyi url'e parametre olarak eklemek aynı zaman kullanıcıyı search sayfasına yönlendirmek istiyoruz.
- Normal şartlarda bunu ancak client component yaparak başarabiliecğimizi düşünürüz ama server component ilede yapmak mümkündür

# Static Site Generation (SSG)

- SSG, next.jsin build (derleme) sırasında sayfaları önceden html olarak üretip sunucuda saklamasıdır.
- Kullanıcı siteyi ziyaret ettiğinde sayfalar anında ve çok hızlı şekilde sunulur çünkü sayfa önceden hazırlanmıştır

## Static Sayfa

- Build anında html hazırlanıp sunucuda saklanır kullanıcı sayfaya girdiği anda tekrar hazırlanmadan direkt sunulan sayfalarıdır.

## Dinamik Sayfa

- Kullanıcı sayfaya girdiği anda hazırlanıp kullanıcyı sunulan sayfalardır
- Genelde ur'de parametresi olan ve sayfa içieriği url'deki parametreye göre değiğen sayfalardır

## Dinamik Sayfaları Statik Yapma (generateStaticParams)

- Bu fonksiyon dinamik olan sayfaları stateik hale çevirir.
- Build sorasomda çağrılan dinamik route'lar için bir parametre listesi döndürür.
- Next.js'de bu listedeki herbir parametre için o detay sayfasının statik bir versiyonunu oluştur

- generateStaticParams() > [{id:1},{id:2},{id3}]
- yukarıdaki dizideki her id değeri için static bir detay sayfası oluşturur
- /1 , /2 , /3 adreslerine giden bir kullanıcı önceden hazırlanmış html içeriğini yükler

## Static Sayfayı Dinamik Sayfa Yapma (revalidate | dynamic)

- Next.js varsayılan olarak parametreye sahip olmayan bütün sayfaları statik sayfa yapar.
- Ama bazen biz bu sayfa içeriklerinin statik olmasını istemeyebiliriz.
- Bu durumda revalidate ve dynamic özellikleri kullanılabilir

# Fullstack Framework

- Next.js bize hem frontend hemde backend kodlarını tek bir proje içerisinde yazmayı vaad ediyor.
- Next.js, api oluştururken klasik nodejs/experess api'Larından farklı next.js'e has routing yöntemini kullanırız.

- Backend route'larını oluşturmak için `app klasörü` içerisine `api klasörü` oluştururuz.
- Oluşturmak istediğimiz her endpoint için yeni bir klasör ve o klasör içerisine `route.js` dosyası oluştururuz.
- Oluşturduğumuz route içeriisnde cevap vermek istediğimiz HTTP metodunun ismiyle bir fonksiyon oluştururuz.
