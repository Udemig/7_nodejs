import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);

    return {
      message: 'Kullanıcı kaydı başarılı',
      data: result,
    };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // servis fonksiyonunu çağır
    const result = await this.authService.login(dto);

    // tokenları çerez olarak ekle
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', result.refrehToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Kullanıcı girişi başarılı',
      data: result.user,
    };
  }

  @UseGuards(AccessGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return {
      message: 'Çıkış başarılı',
    };
  }

  @UseGuards(RefreshGuard)
  @Post('refresh-token')
  async refreshToken() {
    return 'Token yenilendi';
  }

  @UseGuards(AccessGuard)
  @Get('profile')
  async getProfile() {
    return 'Profil alındı';
  }
}
