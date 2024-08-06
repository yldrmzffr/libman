import { HttpStatus } from '@nestjs/common';
import { codes, CommonException } from '../../commons/exceptions';

export class BookAlreadyExistsException extends CommonException {
  constructor() {
    super('Book already exists', HttpStatus.CONFLICT, codes.bookAlreadyExists);
  }
}
