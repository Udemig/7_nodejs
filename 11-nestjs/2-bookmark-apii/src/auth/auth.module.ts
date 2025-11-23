import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';

@Module({
  // Dışarıdan gelen modülleri import ediyoruz
  imports: [JwtModule.register({}), PassportModule.register({})],
  // Servisleri export ediyoruz
  providers: [AuthService, JwtRefreshStrategy, JwtAccessStrategy],
  // Controller'ları export ediyoruz
  controllers: [AuthController],
})
export class AuthModule {}
