import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  photo: string;

  @Prop()
  tags: string[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string;

  commentCount?: number;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

// sanal değer olarak bloga gelen yorumların sayısını hesapla
BlogSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: 'id',
  foreignField: 'blog',
  count: true,
});

export type BlogDocument = Blog & Document;

export { BlogSchema };
