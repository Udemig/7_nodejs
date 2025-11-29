## Genel

- Typescript yazılcak bir blog websitesinin API'si

## API Endpoints

### Auth

| Method | Endpoint              | Açıklama                          |
| ------ | --------------------- | --------------------------------- |
| POST   | `/auth/register`      | Yeni kullanıcı kaydı              |
| POST   | `/auth/login`         | Kullanıcı girişi                  |
| POST   | `/auth/refresh-token` | Access token yenileme             |
| POST   | `/auth/logout`        | Çıkış yapma                       |
| GET    | `/auth/profile`       | Mevcut kullanıcnın bilgilerini al |

### Blog

| Method | Endpoint     | Açıklama              |
| ------ | ------------ | --------------------- |
| POST   | `/blogs`     | Yeni blog oluştur     |
| GET    | `/blogs`     | Tüm blogları listele  |
| GET    | `/blogs/own` | Kendi bloglarımı alma |
| GET    | `/blogs/:id` | Blog Detayı alma      |
| PATCH  | `/blogs/:id` | Blog'u güncelle       |
| DELETE | `/blogs/:id` | Blog'u kaldır         |

### Comments

| Method | Endpoint                            | Açıklama                    |
| ------ | ----------------------------------- | --------------------------- |
| POST   | `/blog/:blogId/comments`            | Bir blog'a yorum atma       |
| GET    | `/blog/:blogId/comments`            | Bir blog'a ait yourmları al |
| DELETE | `/blog/:blogId/comments/:commentId` | Bir yorum'u kaldır          |
| PATCH  | `/blog/:blogId/comments/:commentId` | Bir yorum'u güncelle        |

# Kütüphaneler

- nestjs/config
- nestjs/jwt
- nestjs/mongoose
- mongoose
- nestjs/passport
- passport
- passport-jwt
- passport-local
- class-validator
- class-transformer
- bcrypt
- helmet
- cors
- cookie-parser

- @types/bcrypt
- @types/node
- @types/express
- @types/jsonwebtoken
- @types/passport-jwt
- @types/passport-local
- @types/cookie-parser
