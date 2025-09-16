# ------------------
# TABAN IMAJ -- BASE IMAGE
# ----------------------
# Nodejs uygulamamızı çalıştırmak için resmi Node imajını kullanacağız.
# 'alpine' varyantı küçük boyutlu, hızlı dağıtıma sahip ve üretim için ideal bir Linux işletim sistemi örneğidir
FROM node:18-alpine

# -------------------------------
# ÇALIŞMA DİZİNİ
# -------------------------------
# Container içinde /app klasörünü "işyeri" gibi belirliyoruz.
# İleride yürütülecek bütün kodlar varsayılan olarak /app klasörünün içinde çalıştırılacak.
WORKDIR /app

# ---------------------------
# BAĞIMLILIKLARI KOPYALAMAK
# ---------------------------

# Önce sadece package.json ve package-lock.json dosyalarını kopyalıyoruz.
# ! node_modules'ü asla kopyalamamalıyız, çünkü node_modules her cihazda "npm install" ile elde edilmelidir.
# Bu yöntem hem daha hızlıdır. Hem de daha güvenlidir.
COPY package*.json ./

# -------------------
# BAĞIMLILIKLARI KURMAK
# ----------------

# npm ci => npm install'a göre daha temiz bir kurulum yapar (cache temizliği)
# ^ --omit=dev komutu, devDependencies yani sadece geliştirme ortamı için gereken bağımlılıkları alma anlamına gelir.

RUN npm ci --omit=dev

# ---------------------------
# UYGULAMA KODLARI
# ---------------------------

# Artık tüm kaynak kodu kopyalamamız lazım
# ! FAKAT, node_modules'ün kopyalanmasını istemiyoruz.
# Bu sebepten bir .dockerignore dosyası oluşturup içeride node_modules'ü almayacağız.
# copy . . => şuan bulunduğum klasördeki herşeyi hedef konteynırın ana klasörüne /app kopyala.
COPY . .

# ---------------------------------------
# GÜVENLİK İÇİN: ROOT OLMAYAN KULLANICI
# ---------------------------------------

# Container içerisinde root yerine normal bir kullanıcı ile çalışmak iyi pratiktir.
# Bunun sebebi root yetkisine sahip bir kullanıcı eğer hacklenirse bütün sistemi yok etmek de dahil olmak üzere çok büyük hasara yol açabilir, hasarı minimize etmek için gerekli olmayan yetkileri vermiyoruz.

# burada önce app isminde root yetkisi olmayan bir grup oluşturuyoruz,
# sonrasında ise bu app grubuna dahil, app isminde bir kullanıcı oluşturuyoruz.
# en son olarak da bu kullanıcıya geçiş yapıyoruz.
RUN addgroup -S app && adduser -S app -G app
USER app


# ------------------------------------
# PORT BİLGİSİ
# ------------------------------------

# EXPOSE komutuyla dışarıya açılan portumuzu belirtiriz. 
# Bu portu kullanarak gerçek cihazımızla sanal konteynırımız arasında iletişim sağlanabilir.
EXPOSE 3000

# ----------------------------------
# BAŞLATMA KOMUTU
# --------------------------------

# Container çalıştığında Express uygulamamızı başlatıyoruz.

CMD ["npm","run","start"]
