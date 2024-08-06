import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  versionKey: false,
})
export class Book {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
