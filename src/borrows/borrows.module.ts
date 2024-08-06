import { Module } from '@nestjs/common';
import { BorrowsRepository } from './borrows.repository';
import { BorrowsService } from './borrows.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowSchema } from './schemas/borrow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Borrow',
        schema: BorrowSchema,
      },
    ]),
  ],
  providers: [BorrowsRepository, BorrowsService],
  exports: [BorrowsService],
})
export class BorrowsModule {}
