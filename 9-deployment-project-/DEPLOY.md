# Proje Yayınlama

### Build

- Derlemem aşamasına verilen isimdir.
- Gliştirme ortamındaki kodları alır, yayınlama ortamı için optimize eder.
- Örn bir react projesinde:
- - tüm js dosyları birleştirilir ve optimize edilir
- - tüm css dosyları birleştirilir ve optimize edilir
- - gereksiz açıklama satırlarını siler
- - ve sonuç olarak bir dist klasörü içerisinde projenin optimize edilmiş yayına hazır versiyonu oluşur

### Ortam Ayırma

- Projede geliştirme ortamında ve yayınlmama ortamında genelde farklı değişkenler kullanırız bundan dolayı yayınlamadan önce bu değişkenleri farklı .env dosyalarına ayırıp gerekli konfigürasyonları yapmalıyız

### Github / Docker

- Modern yayınlama yöntemlerinde projenin ci/cd süreci için gihub veya dockerhub'a yüklenmesi gerekir

### Hosting (Barındırma)

- Projenin sürekli çalışıcağı bir sunucuya yükleme işlemdir.
- örnek hosting servisleri:
- frontend: vercel, netflify, firebase-hosting
- backend: render, railway, heroku, firebase-hosting, google cloud run
- VPS backend: digital-ocean, aws ec2, linode, hetzner, güzelhosting, contabo (linux terminal komutlarını bilmek gerekli)

### Domain

- Domain, internet üzerindeki bir websitesinin adresidir. Kullanıcı bir websitesine girmek için IP adresi (192.168.1.2.4) yerine daha akılda kalıcı bir alan adı (www.amazon.com) kullanır.

- Domain Parçaları
- - www: alt alan adı (sub domain)
- - amazon: asıl alan adı (domain)
- - .com/.net: üst düzel alan adı (tld)

### DNS

- Domain name system, domain adlarını ıp adresine çeviren bir sistemdir.
- Örn: amazon.com yazdığımızda:

1. DNS, bu domain'in hangi IP adresine karşılık geldiğini bulur
2. Tarayıcı, o IP adresine giderek siteyi açar.

- Yapılan dns güncellemerini bütün dünyaya yayılması için max 48 saate kadar sürebilir.

## A Kaydı

- Domaine giren kullanıcnın hangi ip adresine yönlendirileceğini belirler

## CName

- Bir alan adını farklı bir alan adına yönlendirmek için kullanırız

## TTL

- Time to Live: Yapılan değişkliğin internete yansıma süresi

## Subdomain (Alt Alan Adı)

- Subdomain, bir domainin önüne eklenen ve ana domainin bir alt bölümü gibi çalışan alan adıdır

- `subdomain.maindomain.extension`
- `amazon.com` > projenin frontendi
- `api.amazon.com` > projenin backendi
- `admin.amazon.com` > projenin admin paneli
