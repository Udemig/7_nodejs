import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Dotenv kurulumu
    ConfigModule.forRoot({ isGlobal: true }),
    // MongoDB bağlantısı
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/blogdb',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
