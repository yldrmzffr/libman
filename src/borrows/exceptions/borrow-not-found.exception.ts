import { codes, CommonException } from '../../commons/exceptions';

export class BorrowNotFoundException extends CommonException {
  constructor() {
    super('Borrow not found', 404, codes.borrowNotFound);
  }
}
