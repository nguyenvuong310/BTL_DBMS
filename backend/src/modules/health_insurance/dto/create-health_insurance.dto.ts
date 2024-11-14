import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateHealthInsuranceDto {
  @IsString()
  gender: string;

  @IsString()
  insuranceNumber: string;

  @IsString()
  placeOfRegistration: string;

  @IsDate()
  @Type(() => Date)
  timeStart: Date;

  @IsDate()
  @Type(() => Date)
  timeEnd: Date;
}
