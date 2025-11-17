import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';

@Controller('product')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class ProductController {
  @Get()
  findAll() {
    return { message: 'Bütün ürünler' };
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return { message: 'Ürün oluşturuldu', body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return { message: 'Ürün güncellendi', id, body };
  }
}
