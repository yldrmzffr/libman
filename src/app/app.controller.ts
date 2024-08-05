import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from './types';

@ApiTags('common')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Health check.',
  })
  @Get('health')
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
