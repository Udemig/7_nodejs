import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDTO } from './dto/bookmark.dto';
import { GetBookmarkQueryDto } from './dto/get-bookmark-query.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: BookmarkDTO) {
    // prismi ile yeni bookmark oluştur
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    // controller'a veriyi return et
    return { bookmark };
  }

  async findAllBookmarks(userId: number, queryParams: GetBookmarkQueryDto) {
    const page = Number(queryParams.page);
    const limit = Number(queryParams.limit);
    const skip = (page - 1) * limit;

    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId },
      skip,
      take: limit,
      include: { user: { select: { firstName: true, lastName: true } } }, // mongoose'daki populate gibi referans alanını döndürür
    });

    return { page, limit, bookmarks };
  }

  async findOneBookmark(userId: number, bookmarkId: number) {
    // prisma ile bookmark'u al
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId, userId }, // bookmarkId ve userId'ye göre bookmark'u al
      include: { user: { omit: { hash: true } } }, // kullanıcının şifresi dışında bütün değerlerinin referansını al
    });

    // bookmark bulunamadıysa hata fırlat
    if (!bookmark) {
      throw new NotFoundException('Bookmark bulunamadı');
    }

    // controller'a gidicek cevabı return et
    return { bookmark };
  }

  async updateBookmark(userId: number, bookmarkId: number, dto: BookmarkDTO) {
    try {
      // prisma ile bookmark'u güncelle
      const bookmark = await this.prisma.bookmark.update({
        where: { id: bookmarkId, userId },
        data: dto,
      });

      return { bookmark };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Bookmark bulunamadı');
      }

      throw error;
    }
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
    try {
      // prisma ile bookmarkı sil
      const bookmark = await this.prisma.bookmark.delete({
        where: { id: bookmarkId, userId },
      });

      // controller'a gidicek cevabı return et
      return { bookmark };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Bookmark bulunamadı');
      }

      throw error;
    }
  }
}
