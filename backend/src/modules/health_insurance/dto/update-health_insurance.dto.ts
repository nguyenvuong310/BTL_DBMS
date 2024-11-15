import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthInsuranceDto } from './create-health_insurance.dto';

import { HealthInsurance } from '../entities/health_insurance.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateHealthInsuranceDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'male' })
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'CN3010003500099' })
  insuranceNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'BV Da Khoa TPHCM' })
  placeOfRegistration?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ example: '2024-11-15T09:37:17.689Z' })
  timeStart?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ example: '2025-11-15T09:37:17.689Z' })
  timeEnd?: Date;

  constructor(healthInsurance: HealthInsurance) {
    this.gender = healthInsurance?.gender;
    this.insuranceNumber = healthInsurance?.insuranceNumber;
    this.placeOfRegistration = healthInsurance?.placeOfRegistration;
    this.timeStart = healthInsurance?.timeStart;
    this.timeEnd = healthInsurance?.timeEnd;
  }
}
