import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    type: String,
  })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
