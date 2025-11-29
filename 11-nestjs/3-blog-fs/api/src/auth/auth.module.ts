import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategy/access.strategy';
import { JwtRefreshStrategy } from './strategy/refresh.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // User modelini module'e tanıttık
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // JwtModule'ı module'e tanıttık
    JwtModule.register({
      global: true,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
