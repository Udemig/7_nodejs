import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (doc, ret: Record<string, any>) => {
      delete ret?._id;
      delete ret?.password;
    },
  },
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

// class üzerinden schema oluştur
const UserSchema = SchemaFactory.createForClass(User);

// kullanıcyı kaydetmeden önce şifresini hashle
UserSchema.pre('save', async function (next) {
  try {
    // şifre değişmediyse next
    if (!this.isModified('password')) return next();

    // şifre değiştiyse hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // user document'ının password alanını güncelle
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// schema'yı export et
export { UserSchema };
