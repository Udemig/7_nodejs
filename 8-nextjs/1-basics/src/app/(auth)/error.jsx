"use client";

// Hata component'ının aldığı proplar
// error: hata detayları
// reset: hata oluşan sayfayı renderlayan fonksiyon
const Error = ({ error, reset }) => {
  return (
    <div className="text-red-500 mt-50 text-lg flex flex-col gap-5 text-center me-4">
      <h2>Üzgünüz bir sorun oluştu</h2>
      <p>{error.message}</p>

      <button onClick={reset} className="p-2 px-4 border rounded-md">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
