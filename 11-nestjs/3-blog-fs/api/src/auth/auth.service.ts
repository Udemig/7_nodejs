import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  // user modelini inject et
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // tokenları oluştur
  private async generateTokens(user: UserDocument) {
    // token'ın versini belirle
    const payload = { userId: user.id, userName: user.username };

    // tokenları oluştur
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
    });
    const refrehToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
    });

    return { accessToken, refrehToken };
  }

  // kullanıcı kaydı
  async register(dto: RegisterDto) {
    const newUser = await this.userModel.create(dto);

    return newUser;
  }

  // kullanıcı girişi
  async login(dto: LoginDto) {
    // bu username ile bir kullanıcı var mı kontrol et
    const user = await this.userModel.findOne({ username: dto.username });

    // kullanıcı yoksa hata dön
    if (!user) {
      throw new UnauthorizedException('Giriş bilgileri hatalı');
    }

    // şifre kontrolü
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    // şifre hatalıysa hata dön
    if (!isPasswordValid) {
      throw new UnauthorizedException('Giriş bilgileri hatalı');
    }

    // tokenları oluştur
    const { accessToken, refrehToken } = await this.generateTokens(user);

    // tokenları dön
    return { user, accessToken, refrehToken };
  }

  // kullanıcya eriş
  async findUserById(userId: string) {
    return await this.userModel.findById(userId);
  }
}
