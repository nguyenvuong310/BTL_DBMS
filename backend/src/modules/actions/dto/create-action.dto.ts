import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateActionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  postId: number;
}
