import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // jwt tokenı isteğin nersinde
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // tokenın süresi dolduysa hata fırlat
      ignoreExpiration: false,
      // tokenın secret key'i
      secretOrKey: config.get('JWT_ACCESS_SECRET') as string,
    });
  }

  // doğrulama işlemi tamamlandıktan sonra çalışan fonksiyon
  // fonksiyondan return edilen değer request.user'a atanır
  async validate(payload: any) {
    // kullanıcın id'sine göre veritabanında kullanıcıyı al
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      omit: { hash: true },
    });

    // kullanıcı bulunamadıysa hata fırlat
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    // req.user'a atanacak değer
    return user;
  }
}
