import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  // Bir endpoin tanımlama
  // localhost:3000/property adresine gelen get isteklerini yakalaycak
  // istek gelince findAll fonksiyonunu çalıştıracak
  // findAll fonksiyonu return edeceği değer client'a cevap olarak gönderilecek
  // @Query decorator'ü ile isteğin query parametrelerine erişebiliriz
  @Get()
  findAll(@Query('order') order: string, @Query('sort') sort: string) {
    return { message: 'Bütün mülkler', order, sort };
  }

  // id parametresi tanımlayalım
  // @Param decorator'ü ile id parametresine erişebiliriz
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Mülk bulundu', id };
  }

  // @Body decarator'ü ile isteğin body kısmına erişebiliriz
  // @UsePipes(new VP()): body kısmında gelen verinin doğrulanmasını sağlar
  // whitelist: true: DTO'da tanımlanmamış verileri kaldırır
  // forbidNonWhitelisted: true: DTO'da tanımlanmamış veri olursa hata fırlatır
  // always: DTO'da tanımlanmış ve grupta olmayan doğrulamarıda çalıştırır
  // transform: Verileri DTO'da tanımlanan formata dönüştürür
  @Post()
  @UsePipes(
    new ValidationPipe({
      groups: ['create'],
      whitelist: true,
      forbidNonWhitelisted: true,
      always: true,
      transform: true,
    }),
  )
  create(@Body() body: CreatePropertyDto) {
    return { message: 'Mülk oluşturuldu', body };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() body: CreatePropertyDto) {
    return { message: 'Mülk güncellendi', id, body };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, groups: ['update'] }))
  updatePart(@Param('id') id: number, @Body() body: CreatePropertyDto) {
    return { message: 'Mülk kısmi güncellendi', id, body };
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (id === '1') {
      throw new NotFoundException('Mülk bulunamadı');
    }

    return { message: 'Mülk silindi', id };
  }
}
