import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: SignupDTO) {
    const result = await this.authService.signup(dto);

    return {
      message: 'Kullanıcı başarıyla oluşturuldu',
      ...result,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const result = await this.authService.login(dto);

    return {
      message: 'Hesabınıza giriş yapıldı',
      ...result,
    };
  }

  // bu adrese isstek atılınca önce access tokenı geçerli mi kontrol edilecek
  @UseGuards(AuthGuard('jwt-access'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    return {
      message: 'Oturumunuz kapatıldı',
    };
  }

  // bu adrese isstek atılınca önce refresh tokenı geçerli mi kontrol edilecek
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    // İstek atan kullanıcı bilgilerine erişebiliriz
    const user = req.user as { userId: number; email: string };

    // Kullanıcıya erişemezsek hata fırlat
    if (!user) {
      throw new ForbiddenException('Kullanıcı bulunamadı');
    }

    // Kullanıcının tokenlarını yenile
    const tokens = await this.authService.signTokens(user.userId, user.email);

    return {
      message: 'Token yenilendi',
      ...tokens,
    };
  }
}
