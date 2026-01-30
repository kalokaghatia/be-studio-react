import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
@UseInterceptors(ClassSerializerInterceptor)
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ default: true })
  isActive: boolean;
  
  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
