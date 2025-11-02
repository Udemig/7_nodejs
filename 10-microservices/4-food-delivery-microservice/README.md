# Food Delivery Microservice Backend

- Yemek sipariş işlemlerini destekleyen mikroservis mimari ile geliştirilmiş bir backend sistemi.
  Kullanıcı kimlik doğrulaması, restoran işlemleri, sipariş takibi, ve teslimat yönetimi sağlar.

## Sistem Yapısı

- **API Gateway** (port:3000): Merkezi giriş noktası
- **Auth Service** (port:3001): Kullanıcı girişi ve yetkilendirme
- **Delivery Service** (port:3002): Kurye ve teslimat takibi
- **Order Service** (port:3003): Sipariş İşlemleri
- **Restaurant Service** (port:3004): Restoran ve Menü Yönetimi

## Teknolojiler

- nodejs
- express
- mongodb - mongoose
- jsonwebtoken
- rabbitmq - amqlib
- typescript
- bcrypt
- express-http-proxy
- express-rate-limit
- zod
- dotenv
- cookie-parser
- nodemon
- helmet
- morgan
- cors

# Kurulum

### Gereksinimler

- Nodejs
- MongoDB
- RabbitMQ

### Kurulum Komutları

- `npm i -D typescript`
- `npx tsc --init`
- `npm i express mongoose jsonwebtoken amqplib bcrypt zod dotenv cookie-parser helmet morgan cors express-rate-limit`
- `npm i -D @types/amqplib @types/bcrypt @types/cookie-parser @types/express @types/jsonwebtoken @types/mongoose @types/morgan @types/node @types/cors tsx nodemon`

### Ortam Değişkenleri

PORT=3000
MONGODB_URI=mongodb://localhost:27017/food_ms_user
JWT_SECRET=uzun-benzersiz-anahtar kelime
RABBITMQ_URI=amqp://localhost
RATE_LIMIT_WINDOW=600000
RATE_LIMIT_MAX_REQ=30
