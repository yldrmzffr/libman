import { HttpStatus } from '@nestjs/common';
import { codes, CommonException } from '../../commons/exceptions';

export class UserAlreadyExistsException extends CommonException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT, codes.userAlreadyExists);
  }
}
