import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PropertyModule } from './property/property.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, PropertyModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
