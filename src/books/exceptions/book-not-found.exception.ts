import { codes, CommonException } from '../../commons/exceptions';
import { HttpStatus } from '@nestjs/common';

export class BookNotFoundException extends CommonException {
  constructor() {
    super('Book not found', HttpStatus.NOT_FOUND, codes.bookNotFound);
  }
}
