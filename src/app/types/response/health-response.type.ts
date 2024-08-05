import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Success status of the service',
  })
  success: boolean;

  @ApiProperty({
    type: String,
    description: 'Message from the service',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp of the response',
  })
  timestamp: string;
}
