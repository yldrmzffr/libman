import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CommonException } from '../exceptions';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: CommonException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      errorCode: exception.errorCode,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
