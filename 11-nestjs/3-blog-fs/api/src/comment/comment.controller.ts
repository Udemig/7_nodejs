import { Body, Controller, Param, Post, UseGuards,Request, Get, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment-dto';
import type {Request as RequestType} from "express";
import { UserDocument } from 'src/auth/schemas/user.schema';
import { AccessGuard } from 'src/auth/guards/access.guard';

@Controller()
export class CommentController {
    constructor(private commentService:CommentService){}

    @UseGuards(AccessGuard)
    @Post("/blog/:blogId/comments")
    async create(@Body() dto:CommentDto,@Param("blogId") blogId:string, @Request() request:RequestType){
        const userId = String((request.user as UserDocument)._id);

        const result = await this.commentService.create(dto,blogId,userId);

        return {message:"Yorum atıldı", data:result}
    }

    @Get("/blog/:blogId/comments")
    async findAll(@Param("blogId") blogId:string,@Query("page") page:number,@Query("limit") limit:number){
        const result = await this.commentService.findAll(blogId,page,limit);

        return {message:"Yorum listesi", pagination:{
            total:result.total,
            page:result.page,
            limit:result.limit,
            totalPage:result.totalPage
        } , data:result.comments}
    }
}
