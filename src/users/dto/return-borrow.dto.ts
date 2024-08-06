import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnBorrowDto {
  @ApiProperty({
    type: Number,
    description: 'User score for the book (1-10)',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  score: number;
}
