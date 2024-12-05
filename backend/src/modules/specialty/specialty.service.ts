import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SpecialtyRepository } from './specialty.repository';
import { InfoSpecialtyDto } from './dto/info-specialty.dto';

@Injectable()
export class SpecialtyService {
  constructor(
    @Inject(SpecialtyRepository)
    private specialtyRepository: SpecialtyRepository,
  ) {}

  async findAll(): Promise<InfoSpecialtyDto[]> {
    const specialties = await this.specialtyRepository.findAll();
    return specialties.map((specialty) => new InfoSpecialtyDto(specialty));
  }

  async findById(id: string): Promise<InfoSpecialtyDto> {
    const specialty = await this.specialtyRepository.findOne(id);
    if (!specialty) {
      throw new NotFoundException('Specialty not found');
    }
    return new InfoSpecialtyDto(specialty);
  }

  async searchSpecialtyByName(search: string) {
    const specialties = await this.specialtyRepository.searchSpecialtyByName(search);
    return specialties.map((specialty) => new InfoSpecialtyDto(specialty));
  }
}
