import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { BlogModule } from 'src/blog/blog.module';


@Module({
  imports:[MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}]),BlogModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
