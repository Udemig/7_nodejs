import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ErrorFilter } from './user.filter';
import { UserGuard } from './user.guard';

@Controller('user')
@UseFilters(ErrorFilter)
export class UserController {
  //* Dependency Injection:  UserService'i Injectable olarak işaretlediğimiz için constructor bölümünde direkt erişebildik
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() body: any) {
    return { message: 'Kullanıcı kayıt oldu', body };
  }

  @Post('/login')
  login(@Body() body: any) {
    return { message: 'Kullanıcı giriş yaptı', body };
  }

  @Get('/profile')
  @UseGuards(UserGuard)
  getProfile() {
    return { message: 'Profil bilgileri' };
  }
}
