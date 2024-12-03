import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TimePeriod } from 'src/constants/action.enum';

export class CreatePrescriptionItemDto {
  @IsString()
  @ApiProperty({ example: '000aae48-9377-4e0d-b45b-69c2b7354178' })
  medicineId: string;

  @IsString()
  @ApiProperty({ example: '1 vien' })
  dosage: string;

  @IsEnum(TimePeriod)
  @ApiProperty({ enum: TimePeriod })
  status: TimePeriod;
}
