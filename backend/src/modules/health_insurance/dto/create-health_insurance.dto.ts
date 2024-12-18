import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { HealthInsurance } from '../entities/health_insurance.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthInsuranceDto {
  @IsString()
  @ApiProperty({ example: 'male' })
  gender: string;

  @IsString()
  @ApiProperty({ example: 'CN3010003500099' })
  insuranceNumber: string;

  @IsString()
  @ApiProperty({ example: 'BV Da Khoa TPHCM' })
  placeOfRegistration: string;

  @IsString()
  @ApiProperty({ example: '2024-11-15' })
  timeStart?: string;

  @IsString()
  @ApiProperty({ example: '2025-11-15' })
  timeEnd?: string;

  @IsString()
  @ApiProperty({ example: '2003-11-15' })
  birthDate?: string;

  constructor(healthInsurance: HealthInsurance) {
    this.gender = healthInsurance?.gender;
    this.insuranceNumber = healthInsurance?.insuranceNumber;
    this.placeOfRegistration = healthInsurance?.placeOfRegistration;
    this.timeStart = healthInsurance?.timeStart;
    this.timeEnd = healthInsurance?.timeEnd;
    this.birthDate = healthInsurance?.birthDate;
  }
}
