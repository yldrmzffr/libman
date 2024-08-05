import { HttpException } from '@nestjs/common';

export class CommonException extends HttpException {
  readonly errorCode: number;

  constructor(message: string, statusCode: number, errorCode: number) {
    super(message, statusCode);
    this.errorCode = errorCode;
  }
}
