import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      // cookie'den  token'ı al
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refreshToken,
      ]),
      // token'ın secret keyini tanımla
      secretOrKey: configService.get('JWT_REFRESH_SECRET') as string,
      // token'ın süresi dolduysa hata dön
      ignoreExpiration: false,
    });
  }

  // tokenın geçerli olduğunu kontr eder
  // return edile değer req.user'a atanır
  async validate(payload: any) {
    // payload'ın içindeki userId'ye sahip kullanıcının hesabu duruyor mu
    const user = await this.authService.findUserById(payload.userId);

    // kullanıcı hesabı silindiyse
    if (!user) {
      throw new UnauthorizedException('Kullanıcı hesabı artık mevcut değil');
    }

    // req.user'a atanıcak veriyi belirle
    return user;
  }
}
