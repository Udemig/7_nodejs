import type { LoginInput, RegisterInput } from "./auth.dto.js";
import User from "./auth.model.js";
import type { IUser } from "./types/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Business Logic'i yöneticek ve veritabanı ile iletişime geç
class AuthService {
  private generateToken(user: IUser): string {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return token;
  }

  async register(body: RegisterInput) {
    // email kontrolü
    const existingUser = await User.findOne({ email: body.email });

    // email kullanılıyorsa hata fırlat
    if (existingUser) {
      throw new Error("Bu email adresi zaten kullanılıyor");
    }

    // şifre hashleme
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // kullanıcıyı oluştur
    const user = await User.create({ ...body, password: hashedPassword });

    // token oluştur
    const token = this.generateToken(user);

    // client'a gönderilecek cevabı oluştur
    return {
      user,
      token,
    };
  }

  async login(body: LoginInput) {
    // email kontrolü
    const user = await User.findOne({ email: body.email });
    if (!user) {
      throw new Error("Geçersiz email adresi veya şifre");
    }

    // şifre kontrolü
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Geçersiz email adresi veya şifre");
    }

    // token oluştur
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
