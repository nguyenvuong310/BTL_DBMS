import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsString } from 'class-validator';
import { TimePeriod } from 'src/constants/action.enum';

export class CreatePrescriptionItemDto {
  @IsString()
  @ApiProperty({ example: '08086fb0-4c3a-4908-9929-0e503ebf26fa' })
  medicineId: string;

  @IsString()
  @ApiProperty({ example: '1 vien' })
  dosage: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(TimePeriod, { each: true })
  @ApiProperty({ enum: TimePeriod, isArray: true })
  status: TimePeriod[];
}
