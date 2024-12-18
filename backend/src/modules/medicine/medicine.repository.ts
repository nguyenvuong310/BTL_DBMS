import { Injectable, Inject } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicineRepository {
  constructor(@InjectRepository(Medicine) private healthInsuranceRepository: Repository<Medicine>) {}

  async findAll(exceptListId: string[]): Promise<Medicine[]> {
    return this.healthInsuranceRepository.find({
      where: {
        id: Not(In(exceptListId)),
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Medicine> {
    return this.healthInsuranceRepository.findOne({ where: { id } });
  }
}
