import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;

  @IsUUID()
  doctor_id: string;
}
