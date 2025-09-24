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

- Next.js bizden olabildiğince fazla server component kullanmamızı sekler. (Hız | SEO)
- Her component'ı server component yapamıyoruz. Kullanıcı etkileşmi gerektiren (onClick, onSubmit), veya hooks kullanan (useState,useEffect,useParams) durumlarda client component kullanılması zorunludur

- Not: Next.js bizden olabildiğince çok server component kullanmamız istediği için eğer bir sayfa içerisinde kullanıcı etkileşimi gerektiren bir alan varsa bütün sayfayı client component yapmaka yerine ilgili alanı ayrı bir client component yaparız sayfa ise server component kalmaya devam eder.
