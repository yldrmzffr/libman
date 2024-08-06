import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(data: CreateBookDto): Promise<BookDocument> {
    const createdBook = new this.bookModel(data);
    return createdBook.save();
  }

  async getAll(fields = 'name'): Promise<BookDocument[]> {
    return this.bookModel.find().select(fields).exec();
  }

  async findByName(name: string): Promise<BookDocument> {
    return this.bookModel
      .findOne({
        name,
      })
      .exec();
  }
}
