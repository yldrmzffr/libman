import { ApiProperty } from '@nestjs/swagger';

class BookInfo {
  @ApiProperty({
    type: String,
    description: 'Book ID',
    example: '66b25fdceb5016f112324ecc',
  })
  id: string;
}

class PastBookInfo extends BookInfo {
  @ApiProperty({
    type: String,
    description: 'User score for the book',
    example: '0',
  })
  userScore: string;
}

class Books {
  @ApiProperty({
    type: [PastBookInfo],
    description: 'List of past books',
  })
  past: PastBookInfo[];

  @ApiProperty({
    type: [BookInfo],
    description: 'List of present books',
  })
  present: BookInfo[];
}

export class UserDetailResponseDto {
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '66b25fcceb5016f112324ec7',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: Books,
    description: "User's books information",
  })
  books: Books;
}
