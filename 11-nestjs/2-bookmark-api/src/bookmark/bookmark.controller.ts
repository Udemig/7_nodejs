import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkDTO } from './dto/bookmark.dto';
import User from 'src/auth/decorator/user.decorator';
import { GetBookmarkQueryDto } from './dto/get-bookmark-query.dto';

// Bu controller içerisindeki tüm endpointlere gelen isteklerde önce access token kontrol edilecek
@UseGuards(AuthGuard('jwt-access'))
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  // bookmark oluşturma
  @UsePipes(new ValidationPipe({ groups: ['create'], always: true }))
  @Post()
  async create(@Body() dto: BookmarkDTO, @User('id') userId: number) {
    // servis katmanında yeni bookmark oluştur
    const result = await this.bookmarkService.createBookmark(userId, dto);

    // client'a gidicek cevabı return et
    return {
      message: 'Bookmark oluşturuldu',
      ...result,
    };
  }

  // bookmark listesi
  @Get()
  async findAll(
    @User('id') userId: number,
    @Query() queryParams: GetBookmarkQueryDto,
  ) {
    // servis katmanında bookmark listesini al
    const result = await this.bookmarkService.findAllBookmarks(
      userId,
      queryParams,
    );

    // client'a gidicek cevabı return et
    return {
      message: 'Bookmark listesi',
      ...result,
    };
  }

  // bookmark detayı
  @Get(':id')
  async findOne(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    // servis katmanında bookmark detayını al
    const result = await this.bookmarkService.findOneBookmark(
      userId,
      bookmarkId,
    );

    // client'a gidicek cevabı return et
    return {
      message: 'Bookmark detayı',
      ...result,
    };
  }

  // bookmarkı güncelle
  @UsePipes(new ValidationPipe({ groups: ['update'], always: true }))
  @Patch(':id')
  async update(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: BookmarkDTO,
  ) {
    // servis katmanında bookmarkı güncelle
    const result = await this.bookmarkService.updateBookmark(
      userId,
      bookmarkId,
      dto,
    );

    // client'a gidicek cevabı return et
    return {
      message: 'Bookmark güncellendi',
      ...result,
    };
  }

  // bookmarkı sil
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    // servis katmanında bookmarkı sil
    const result = await this.bookmarkService.deleteBookmark(
      userId,
      bookmarkId,
    );

    // client'a gidicek cevabı return et
    return { message: 'Bookmark silindi', ...result };
  }
}
