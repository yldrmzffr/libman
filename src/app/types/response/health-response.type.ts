import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Success status of the service',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: String,
    description: 'Message from the service',
    example: 'Service is healthy',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp of the response',
    example: '2021-08-16T14:01:00.000Z',
  })
  timestamp: string;
}
