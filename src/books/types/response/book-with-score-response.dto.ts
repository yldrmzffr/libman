import { ApiProperty } from '@nestjs/swagger';

export class BookWithScoreResponseDto {
  @ApiProperty({
    type: String,
    description: 'Book ID',
    example: '60f7b3b3b3f4f0001f000001',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Book name',
    example: 'The Martian',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Book score',
    example: 4.5,
  })
  score: number;
}
