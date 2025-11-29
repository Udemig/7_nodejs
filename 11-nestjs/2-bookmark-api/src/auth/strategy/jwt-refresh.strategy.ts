import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(config: ConfigService) {
    super({
      // jwt tokenı isteğin nersinde
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      // tokenın süresi dolduysa hata fırlat
      ignoreExpiration: false,
      // tokenın secret key'i
      secretOrKey: config.get('JWT_REFRESH_SECRET') as string,
    });
  }

  // doğrulama işlemi tamamlandıktan sonra çalışan fonksiyon
  // fonksiyondan return edilen değer request.user'a atanır
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
