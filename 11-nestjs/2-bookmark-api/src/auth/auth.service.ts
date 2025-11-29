import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signTokens(userId: number, email: string) {
    // token içeriğini tanımla
    const payload = {
      sub: userId,
      email,
    };

    // tokenı imzala
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });

    // döndür
    return { accessToken, refreshToken };
  }

  async signup(dto: SignupDTO) {
    try {
      // şifreyi hashle
      const hashedPassword = bcrypt.hashSync(dto.password, 10);

      // kullanıcıyı veritabanına kaydet
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash: hashedPassword,
        },
      });

      // tokenları oluştur
      const { accessToken, refreshToken } = await this.signTokens(
        newUser.id,
        newUser.email,
      );

      // kullanıcın şifresini temizle
      const { hash, ...user } = newUser;

      // client'a gidicek cevabı return et
      return { user, accessToken, refreshToken };
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('Bu email zaten kullanımda');
      }

      throw err;
    }
  }

  async login(dto: LoginDTO) {
    try {
      // kullanıcıyı veritabanında bul
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      // kullanıcı bulunamadıysa hata fırlat
      if (!user) {
        throw new ForbiddenException('Giriş bilgileri hatalı');
      }

      // şifre doğru kontrolü
      const isPasswordValid = bcrypt.compareSync(dto.password, user.hash);

      // şifre yanlışsa hata fırlat
      if (!isPasswordValid) {
        throw new ForbiddenException('Giriş bilgileri hatalı');
      }

      // tokenları oluştur
      const { accessToken, refreshToken } = await this.signTokens(
        user.id,
        user.email,
      );

      // kullanıcın şifresini temizle
      const { hash, ...userWithoutHash } = user;

      // döndür
      return { user: userWithoutHash, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
