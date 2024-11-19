import { IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
