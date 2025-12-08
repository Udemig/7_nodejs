import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogService } from './blog.service';
import type { Request as RequestType } from 'express';
import { UserDocument } from 'src/auth/schemas/user.schema';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(AccessGuard)
  @Post()
  async create(@Body() body: CreateBlogDto, @Request() req: RequestType) {
    // istek atan kullanıcının id'sini al
    const userId = String((req.user as UserDocument)._id);

    // service fonksiyonunu çalıştır
    const result = await this.blogService.create(body, userId);

    // client'a cevap ver
    return {
      message: 'Blog oluşturuldu',
      data: result,
    };
  }

  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('userId') userId?: string,
  ) {
    const result = await this.blogService.findAll(page, limit, userId);

    return {
      message: 'Bloglar listelendi',
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPage: result.totalPages,
      },
      data: result.blogs,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.blogService.findOne(id);

    return {
      message: 'Blog bulundu',
      data: result,
    };
  }

  @UseGuards(AccessGuard)
  @Patch(':id')
  async update(
    @Param('id') blogId: string,
    @Body() body: UpdateBlogDto,
    @Request() request: RequestType,
  ) {
    const userId = String((request.user as UserDocument)._id);

    const result = await this.blogService.update(body, blogId, userId);

    return {
      message: 'Blog güncellendi',
      data: result,
    };
  }

  @UseGuards(AccessGuard)
  @Delete(':id')
  async delete(@Param('id') blogId: string, @Request() request: RequestType) {
    const userId = String((request.user as UserDocument)._id);

    await this.blogService.delete(blogId, userId);

    return {
      message: 'Blog silindi',
      data: null,
    };
  }
}
