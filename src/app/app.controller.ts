import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from './types';

@ApiTags('common')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Health check.',
    summary: 'Health check endpoint to verify the service is up and running',
  })
  @ApiResponse({
    status: 200,
    description: 'Health check response',
    type: HealthResponse,
  })
  @Get('health')
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
