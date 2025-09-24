import delay from "@/app/utils/delay";

export const metadata = {
  title: "Giriş Yap",
  description: "oturmunu aç...",
};

const Login = async () => {
  // bekleme esnasında otomaik olarak loading componentı ekrana gelir
  await delay(3000);

  // hata fırlatıldığında otomatik olarak error componentı ekrana gelir
  throw new Error("İçerik bulunamadı");

  return (
    <div className="page">
      <h1>Giriş Yap</h1>
    </div>
  );
};

export default Login;
