import { codes, CommonException } from '../../commons/exceptions';

export class BookIsNotAvailableException extends CommonException {
  constructor() {
    super('Book is not available', 400, codes.bookIsNotAvailable);
  }
}
