import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas';
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

  async findById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).exec();
  }

  async findByIds(ids: string[]): Promise<BookDocument[]> {
    return this.bookModel.find({ _id: { $in: ids } }).exec();
  }
}
