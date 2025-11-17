# Nest.js

- Nest.js modern api'lar geliştirmek için kullanılan açık kaynaklı ve typescript tabanlı bir framework.

# Neden Node.js yerine Nest.js

- Modüler Mimari: Kodun yönetilebilrliğini kolaylaştırır.
- Dependency Injection: Bağımlılıkların yönetilmesini kolaylaştırır.
- Entegre typescript desteği
- Express entegre olarak gelir
- Ölçeklenebilir.
- Kapsamlı ekosistem ve dökümantasyon

## NEST CLI Komutları

## Kurulum

```bash
# nest cli (command line interface)'i bilgilsayarınıza dahil eder
$ npm i -g @nestjs/cli

# nest projesi oluştururs
$ nest new project-name
```

## Projeyi Ayağa Kaldırma

```bash
# geliştirici modu
$ npm run start

# geliştirici modu (dosya değişikliklerini anlık algılar: nodemon)
$ npm run start:dev

# buildi alınan projeyi ayağa kaldırır
$ npm run start:prod

# debug modunu çalıştırır
$ npm run start:debug
```

## Oluşturma Komutları - Generate Commands

```bash
# yeni bir modül oluşturma komutu
$ nest g module modüle_ismi

# iligili modüle bir cotroller oluşturma
$ nest g controller/co modüle_ismi

# iligili modüle bir service oluşturma
$ nest g service/s modüle_ismi --no-spec

```

# Nest Temel Kavramlar

## Service

- Veritabanı ile iletişime geçtiğimiz katman

## Controller

- HTTP iseklerini alan ve yanıt veren katman
- Controller içerisinde endpointlerimizi tanımlarız aynı zamanda gelen isteklere verilecek yanıtları belirleriz.

## Dependency Injection

- Bir sınıfın ihtiyaç duyduğu bağımlılıkları sınıfın kendi içinde oluşturmay yerine, otomatik olarak nest.js tarafından sağlanması

- Örn: Servis katmanını @Injectiable ile işaretlediğimizde bu direkt controller katmanının constructor bloğuna parametre olarak gider.
- Örn: Veritabanı bağlantısnın servis katmanına iletilmesi

* Daha modüler ve temiz kod
* Test süreçlerini kolaylaştırır

## Decarator

- @Param(): Url'deki parametrelere erişmeye yarar
- @Query(): Url'deki query parametrelere erişmeye yarar
- @Body(): İsteğin body kısmındaki verisine eirşmeye yarar
- @HTTPCode(): Yanıtın status code'unu belirler

## Execptions

- Hata fırlatırken nest'in kendi özerl hazırlanmış execption'larını kullanırız.
- https://docs.nestjs.com/exception-filters#built-in-http-exceptions

## Pipe

- Middleware katmanı gibi çalışan gelen veryiyi controller'a ulaşmadan önce işleyen yapılardır
- İki türlü pipe vardır:

## Transform Pipe

- Gelen verileri beirli bir formata dönüştürmek için kullanılır.
- Örn: string tipinde gelen id parametresini number'a çevirmek için kullanabiliriz.

ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe
ParseDatePipe

## Validation Pipe

1. Gelen veriyi doğrulan
2. Veriyi dönüştürür
3. Hatalı veriyi engeller

Farklı yöntemler ile oluşturulabilir.

1. class-validator + class-transformer
2. zod

# Middleware

- İstek Controller'a gitemedne önce gelen isteğe müdahala edip istediğimiz yaptırabiliriz.
- Tanımladığımız yere göre kapsamı değişir. Route , Module veya App düzeyinde tanımlanabilir

# Exception Filter

- Nest'in attığı hataları yakalar (NotFoundExecptipon)
- Knedi özel hata yönetim yapmızı kurabiliriz.
- Dönecek sataus code, body, loglama gibi işlmleri düzenleyei,brliizi.

## Guard

- Kullanıcnın bir route'a erişip erişemeceyeceğini karar veren middleware.
- canActivate fonksiyonu true dönerse client'ın isteği devam eder false dönerse 403 forbidden hatası fırlatılır
- Özellikle şu işler için kullanılır.
- - JWT token doğrulama
- - Rol kontrolü
- - API key kontrolü
