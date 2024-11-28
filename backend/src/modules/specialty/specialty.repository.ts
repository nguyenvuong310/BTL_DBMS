import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyRepository {
  constructor(@InjectRepository(Specialty) private hospitalRepository: Repository<Specialty>) {}

  async findAll(): Promise<Specialty[]> {
    return this.hospitalRepository.find();
  }

  async findOne(id: string): Promise<Specialty> {
    return this.hospitalRepository.findOne({ where: { id } });
  }

  async searchSpecialtyByName(search: string): Promise<Specialty[]> {
    return this.hospitalRepository
      .createQueryBuilder('specialty')
      .where('specialty.name like :search', { search: `%${search}%` })
      .getMany();
  }
}
