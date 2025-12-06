import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private blogModel:Model<BlogDocument>){
    }

    async create(dto:CreateBlogDto,userId:string){
      const newBlog =  await this.blogModel.create({...dto,author:userId})

      return newBlog
    }

    async findAll(page:number = 1,limit:number = 10,userId?:string){
       // sorgu ayarlarını belirle
       // kullanıcı id varsa sadece onun bloglarını getir
       const options = userId ? {author:userId} : {}
         
       // İlgili sayfadaki blogları ve toplam sayısını al
       // Sorguları promise.all aracılığı ile paralel çalıştırdık
        const [blogs,total] = await  Promise.all([
            this.blogModel.find(options).skip((page-1)*limit).limit(limit).populate("author","username email"),
            this.blogModel.countDocuments(options)
        ])

      return {
        total,
        blogs,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }

    async findOne(id:string){
        const blog = await this.blogModel.findById(id).populate("author")

         if(!blog){
            throw new NotFoundException("Blog bulunamadı")
         }

         return blog
    }

    async update(dto:UpdateBlogDto,blogId:string,userId:string){
        const blog = await this.blogModel.findById(blogId)

        if(!blog){
            throw new NotFoundException("Blog bulunamadı")
        }

        if(blog.author.toString() !== userId){
            throw new UnauthorizedException("Bu blogu sadece oluşturan kişi güncelleyebilir")
        }

        const updatedBlog = await this.blogModel.findByIdAndUpdate(blogId,dto,{new:true});
        
        return updatedBlog;
    }

    async delete(blogId:string,userId:string){
        const blog = await this.blogModel.findById(blogId)

        if(!blog){
            throw new NotFoundException("Blog bulunamadı")
        }

        if(blog.author.toString() !== userId){
            throw new UnauthorizedException("Bu blogu sadece oluşturan kişi güncelleyebilir")
        }

        await this.blogModel.findByIdAndDelete(blogId)
    }
}
