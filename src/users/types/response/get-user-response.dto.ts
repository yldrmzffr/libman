import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseType {
  @ApiProperty({
    type: String,
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;
}
