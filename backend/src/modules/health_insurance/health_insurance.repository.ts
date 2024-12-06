import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { HealthInsurance } from './entities/health_insurance.entity';
import { CreateHealthInsuranceDto } from './dto/create-health_insurance.dto';
import { UpdateHealthInsuranceDto } from './dto/update-health_insurance.dto';

@Injectable()
export class HealthInsuranceRepository {
  constructor(@InjectRepository(HealthInsurance) private healthInsuranceRepository: Repository<HealthInsurance>) {}

  async save(health_insurance: CreateHealthInsuranceDto, user_id: string): Promise<HealthInsurance> {
    return this.healthInsuranceRepository.save({
      ...health_insurance,
      owner: { id: user_id },
    });
  }

  async update(id: string, health_insurance: UpdateHealthInsuranceDto): Promise<HealthInsurance> {
    return this.healthInsuranceRepository.save({ ...health_insurance, id });
  }

  async findByUserId(user_id: string): Promise<HealthInsurance> {
    return this.healthInsuranceRepository.findOne({ where: { owner: { id: user_id } }, relations: ['owner'] });
  }

  async remove(id: string): Promise<void> {
    await this.healthInsuranceRepository.delete(id);
  }
}
