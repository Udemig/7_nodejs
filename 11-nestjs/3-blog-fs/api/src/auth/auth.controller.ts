import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { UserDocument } from './schemas/user.schema';

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
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // tokenları oluştur
    const result = await this.authService.generateTokens(
      req.user as UserDocument,
    );

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
      message: 'Tokenlar yenilendi',
    };
  }

  @UseGuards(AccessGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user as UserDocument;

    return { message: 'Profil alındı', data: user };
  }
}
