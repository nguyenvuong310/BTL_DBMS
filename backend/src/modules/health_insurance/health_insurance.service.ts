import { Inject, Injectable } from '@nestjs/common';
import { CreateHealthInsuranceDto } from './dto/create-health_insurance.dto';
import { UpdateHealthInsuranceDto } from './dto/update-health_insurance.dto';
import { HealthInsuranceRepository } from './health_insurance.repository';
import { InfoHealthInsuranceDto } from './dto/info-health_insurance.dto';

@Injectable()
export class HealthInsuranceService {
  constructor(
    @Inject(HealthInsuranceRepository)
    private healthInsuranceRepository: HealthInsuranceRepository,
  ) {}

  async create(createHealthInsuranceDto: CreateHealthInsuranceDto, user_id: string): Promise<InfoHealthInsuranceDto> {
    const health_insurance = await this.healthInsuranceRepository.save(createHealthInsuranceDto, user_id);
    return new InfoHealthInsuranceDto(health_insurance);
  }

  async findByUserId(user_id: string) {
    const health_insurance = await this.healthInsuranceRepository.findByUserId(user_id);

    if (!health_insurance) {
      return null;
    }
    return new InfoHealthInsuranceDto(health_insurance);
  }

  async update(id: string, updateHealthInsuranceDto: UpdateHealthInsuranceDto): Promise<InfoHealthInsuranceDto> {
    const updateHealthInsurance = await this.healthInsuranceRepository.update(id, updateHealthInsuranceDto);
    return new InfoHealthInsuranceDto(updateHealthInsurance);
  }

  async remove(id: string) {
    await this.healthInsuranceRepository.remove(id);
  }
}
