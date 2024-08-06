import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { BorrowStatuses } from '../types';

export type BorrowDocument = HydratedDocument<Borrow>;

@Schema({
  _id: false,
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
})
export class BorrowStatusChangeLog {
  @Prop({
    type: Number,
    enum: BorrowStatuses,
    required: true,
  })
  status: BorrowStatuses;

  @Prop({
    type: Date,
    required: true,
    default: now(),
  })
  createdAt?: Date;
}

@Schema({
  versionKey: false,
})
export class Borrow {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  bookId: string;

  @Prop({
    type: Number,
    enum: BorrowStatuses,
    required: true,
    default: BorrowStatuses.Borrowed,
  })
  status: BorrowStatuses;

  @Prop({
    type: Date,
    required: true,
    default: now(),
  })
  createdAt: Date;

  @Prop({
    type: Date,
    required: true,
    default: now(),
  })
  updatedAt: Date;

  @Prop({
    type: [BorrowStatusChangeLog],
    required: false,
  })
  statusChangeLogs?: BorrowStatusChangeLog[];

  @Prop({
    type: Number,
    required: false,
  })
  userScore?: number;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);
