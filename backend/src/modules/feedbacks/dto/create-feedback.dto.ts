import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({ example: 1 })
  rating: number;

  @IsString()
  @ApiProperty({ example: 'good' })
  comment: string;
}
