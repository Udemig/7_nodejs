import { Module, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [ProductController],

  // Providers'a pipe eklememiz sayesinde Bu modül'ün tüm controller'ları için validation pipe otomatik olarak devreye girecektir
  providers: [
    ProductService,
    // {
    //   provide: APP_PIPE,
    //   useFactory: () =>
    //     new ValidationPipe({
    //       whitelist: false,
    //       forbidNonWhitelisted: false,
    //       transform: false,
    //     }),
    // },
  ],
})
export class ProductModule {}
