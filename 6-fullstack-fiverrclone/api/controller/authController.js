import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Kayıt Ol
const register = async (req, res) => {
  try {
    // Kullanıcının şifresini hashle ve saltla
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    // todo: Kullanıcının gönderdiği resmi önce cloude yükle akabinde gelen bağlantıyı veri tabanına kayıt et

    // Kullanıcıyı veri tabanına kayıt etmek için  yeni bir kullanıcı oluştur
    const newUser = await User.create({
      // İsteğin body'si içerisinde bulunan tüm verileri aynen tut sadece password kısmında hashlenmiş ve saltlanmış şifreyi ekle
      ...req.body,
      password: hashedPassword,
    });

    // Client'a gönderilecek cevap içerisinden şifre kısmını kaldır
    newUser.password = null;

    // Başarıyla kullanıcı oluşturulduğunda client'a cevap gönder
    return res
      .status(201)
      .json({ message: "Kayıt işlemi başarılı", user: newUser });
  } catch (err) {
    // Hata durumunda client'a cevap gönder
    const errorObject = error(400, "Kayıt işlemi sırasında bir hata oluştu");

    console.log(err);

    return res
      .status(errorObject.status)
      .json({ message: errorObject.message });
  }
};

// Giriş Yap
const login = async (req, res) => {
  console.log(req.body);

  try {
    // Kullanıcıyı db içerisinde bul
    const user = await User.findOne({ username: req.body.username });

    // Eğer kullanıcı yoksa hata dönder
    if (!user)
      return res.status(404).json({
        message: "Giriş bilgileri yanlış.Giriş bilgilerinizi kontrol ediniz",
      });

    // Kullanıcı bulunursa kullanıcının şifresi doğru mu kontrol et
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    console.log(isCorrect);

    // Şifresi yanlışsa hata dönder
    if (!isCorrect)
      return res.status(404).json({
        message: "Giriş bilgileri yanlış.Giriş bilgilerinizi kontrol ediniz",
      });

    // Şifre doğruysa jwt token oluştur
    const token = jwt.sign(
      { id: user.id, isSeller: user.isSeller },
      process.env.JWT_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    // Client'a gönderilecek cevap içerisinden şifre kısmını kaldır
    user.password = null;

    // client'a cevap gönder
    res
      .cookie("token", token, { httpOnly: true, sameSite: "none" })
      .status(200)
      .json({ message: "Giriş işlemi başarılı", user });
  } catch (err) {
    // Hata durumunda client'a cevap gönder
    const errorObject = error(400, "Giriş işlemi sırasında bir hata oluştu");

    return res
      .status(errorObject.status)
      .json({ message: errorObject.message });
  }
};

// Çıkış Yap
const logout = (req, res) => {
  // Cookie içerisindeki token'ı kaldır
  res.clearCookie("token").status(200).json({
    message: "Çıkış işlemi başarılı",
  });
  res.json({ message: "Çıkış işlemi" });
};

export { register, login, logout };
