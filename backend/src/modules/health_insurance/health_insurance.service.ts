import { Inject, Injectable } from '@nestjs/common';
import { CreateHealthInsuranceDto } from './dto/create-health_insurance.dto';
import { UpdateHealthInsuranceDto } from './dto/update-health_insurance.dto';
import { HealthInsuranceRepository } from './health_insurance.repository';

@Injectable()
export class HealthInsuranceService {
  constructor(
    @Inject(HealthInsuranceRepository)
    private healthInsuranceRepository: HealthInsuranceRepository,
  ) {}

  async create(createHealthInsuranceDto: CreateHealthInsuranceDto) {
    return this.healthInsuranceRepository.save(createHealthInsuranceDto);
  }

  async findByUserId(user_id: string) {
    const health_insurance = await this.healthInsuranceRepository.findByUserId(user_id);

    if (!health_insurance) {
      throw new Error('Health insurance not found');
    }
  }

  async update(id: string, updateHealthInsuranceDto: UpdateHealthInsuranceDto) {
    return this.healthInsuranceRepository.update(id, updateHealthInsuranceDto);
  }

  async remove(id: string): Promise<string> {
    await this.healthInsuranceRepository.remove(id);
    return 'Health insurance removed';
  }
}
