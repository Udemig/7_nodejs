import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (doc, ret: Record<string, any>) => {
      delete ret._id;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (doc, ret: Record<string, any>) => {
      delete ret._id;
      return ret;
    },
  },
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  user: string;

  @Prop({ required: true, ref: 'Blog', type: Types.ObjectId })
  blog: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

export type CommentDocument = Comment & Document;

export { CommentSchema };
