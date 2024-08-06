import { Injectable, Logger } from '@nestjs/common';
import { HealthResponse } from './types';
import { LogMe } from '../commons/decorators';

@Injectable()
export class AppService {
  @LogMe()
  getHealth(): HealthResponse {
    return {
      success: true,
      message: 'The service is up and running',
      timestamp: new Date().toISOString(),
    };
  }
}
