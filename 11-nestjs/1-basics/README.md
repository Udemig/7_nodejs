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
