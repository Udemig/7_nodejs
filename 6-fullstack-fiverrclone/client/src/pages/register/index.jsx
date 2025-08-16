import React, { useState } from "react";
import Input from "../../components/input";
import Switch from "../../components/switch";
import Button from "../../components/customButton";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  // Satıcı hesabı için state
  const [isSeller, setIsSeller] = useState(false);

  const { register } = useContext(AuthContext);

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();

    // Form Data örneği oluştur
    const formData = new FormData(e.target);

    // formData nesnesi içerisindenn inputlara eriş
    const newUser = Object.fromEntries(formData.entries());

    // isSeller değerini newUser içerisine iliştir
    newUser.isSeller = isSeller;

    console.log(newUser);

    // Backend'e kayıt edilecek kullanıcıyı gönder
    register(newUser);
  };

  return (
    <div className=" max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        {/* Left Area */}
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Yeni Hesap Oluştur
          </h1>

          <Input label="İsim" type="text" name="username" />
          <Input label="Email" type="email" name="email" />
          {/* <Input label="Fotoğraf" type="file" name="photo" /> */}
          <Input label="Ülke" type="text" name="country" />
          <Input label="Şifre" type="password" name="password" />
        </div>
        {/* Right Area */}
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Satıcı Olmak İstiyorum
          </h1>

          <Switch setIsSeller={setIsSeller} />

          <Input
            label="Telefon"
            type="number"
            disabled={!isSeller}
            name="phone"
          />
          <Input
            label="Açıklama"
            type="text"
            disabled={!isSeller}
            name="desc"
          />

          <Button text="Kaydol" />
        </div>
      </form>
    </div>
  );
};

export default Register;
