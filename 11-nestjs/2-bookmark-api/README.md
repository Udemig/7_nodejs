# API Endpoints

-- Auth
--- POST /auth/signup > yeni kullanıcı oluştur
--- POST /auth/login > kullanıcı girişi
--- POST /auth/logout > oturum kapat
--- POST /auth/refresh > token yenileme

-- User Endpoints (JWT Kontrolü)
--- GET /user/profile > kullanıcı profili
--- PUT /user/:id > kullanıcı profilini güncelle

-- Bookmark Endpoints (JWT Kontrolü)
--- GET /bookmarks > bookmark listesi
--- GET /bookmarks/:id > bookmark detayı
--- POST /bookmarks > bookmark oluştur
--- PUT /bookmarks/:id > bookmark güncelle
--- DELETE / bookmarks/:id > bookmark sil

# Nest Enviroment Variables

- Nest.js'de env variable'ları kullanabilmek için @nestjs/config pakedini indirip kurulumunu yapmamız gerekli.

- Projeyi ayağa kaldırıken hangi env dosyasını kullancığımızda söylemeliyiz `nest start --env-file .env``

# ORM

- Object Relational Mapping

- - Yani kod tarafındaki (User,Product vs.) objelerini veritbanındaki tablolara bağlayan sistem.

#### Neden ORM Kullanayım ?

- - Orm'in kendi syntax'ı ile kodumuzu yazarız hangi veritbanını kullanıcaksak ORM yazına kodu o veritabanın anladığı dile çevirir.
- - Bu sayede projede istediğimzi anda hiç extra kod yazmadan veritbanı değişimine gidebiliriz.
- - SQL, yazmadan herhangi bir sql veritbanını kullabiliriz.
- - Daha güvenli, SQL injection riski azalır.

### Prisma

- JS/TS için modern bir ORM.
- Otomatik ts tipleri oluşturur.
- `prisma studio` ile verileri tarayıcıdan görebiliriz (admin paneli gibi)
- Migration (şema değişklik) yönetimi kolaydır
