import { ApiProperty } from '@nestjs/swagger';

export class BookListResponseDto {
  @ApiProperty({
    type: String,
    description: 'Book ID',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Book name',
  })
  name: string;
}
