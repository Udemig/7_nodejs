import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment-dto';
import { Comment ,CommentDocument,CommentSchema} from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class CommentService {
     constructor(@InjectModel(Comment.name) private commentModel:Model<CommentDocument>,private blogService:BlogService){}
    
     async create(dto:CommentDto,blogId:string,userId:string){
        // blogId'si geçerli mi kontrol et?
        const blog = await this.blogService.findOne(blogId)

        // yorumu oluştur
        return await this.commentModel.create({...dto,user:userId,blog:blogId})
    }

    async findAll(blogId:string,page:number = 1, limit:number = 20){
        const [comments,total] = await    Promise.all([
         this.commentModel.find({blog:blogId}).skip((page-1)*limit).limit(limit),
         this.commentModel.countDocuments({blog:blogId})
            ])

        return {
            comments,
            total,
            page,
            limit,
            totalPage:Math.ceil(total/limit)
        } 
    }
}
