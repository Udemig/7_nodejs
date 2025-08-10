// Aldığı parametrelere göre bir hata mesajı döndürecek fonksiyon

const error = (status, message) => {
  // Bir hata nesnesi oluştur
  const err = new Error();

  // Oluşturulan hata objesini güncelle
  err.message = message;
  err.status = status;

  // Hata objesini döndür
  return err;
};

export default error;
