import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalsRepository {
  constructor(@InjectRepository(Hospital) private hospitalRepository: Repository<Hospital>) {}

  async findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.find();
  }

  async findOne(id: string): Promise<Hospital> {
    return this.hospitalRepository.findOne({ where: { id } });
  }
}
