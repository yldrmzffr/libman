import { codes, CommonException } from '../../commons/exceptions';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends CommonException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND, codes.userNotFound);
  }
}
