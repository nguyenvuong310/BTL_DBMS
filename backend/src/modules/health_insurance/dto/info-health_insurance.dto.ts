import { CreateHealthInsuranceDto } from './create-health_insurance.dto';
import { HealthInsurance } from '../entities/health_insurance.entity';
import { ApiProperty } from '@nestjs/swagger';

export class InfoHealthInsuranceDto extends CreateHealthInsuranceDto {
  @ApiProperty({ example: '80449205-d133-439e-96dc-c113fa29318d' })
  id: string;

  @ApiProperty({ example: 'acfa91cf-a332-11ef-a2a3-0242ac140003' })
  owner: string;

  @ApiProperty({ example: '2024-11-15' })
  birthDate: string;

  @ApiProperty({ example: '2024-11-15T02:25:33.074Z' })
  createdAt: Date;

  constructor(healthInsurance: HealthInsurance) {
    super(healthInsurance);
    this.id = healthInsurance?.id;
    this.owner = healthInsurance?.owner?.id;
    this.birthDate = healthInsurance?.owner?.birthDate;
  }
}
