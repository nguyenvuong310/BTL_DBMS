import { Inject, Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { HospitalsRepository } from './hospitals.repository';
import { Hospital } from './entities/hospital.entity';
import { InfoHospitalDto } from './dto/info-hospital.dto';

@Injectable()
export class HospitalsService {
  constructor(
    @Inject(HospitalsRepository)
    private hospitalsRepository: HospitalsRepository,
  ) {}

  async findAll(): Promise<InfoHospitalDto[]> {
    const hospitals = await this.hospitalsRepository.findAll();
    return hospitals.map((hospital) => new InfoHospitalDto(hospital));
  }

  async findById(id: string): Promise<InfoHospitalDto> {
    const hospital = await this.hospitalsRepository.findOne(id);
    return new InfoHospitalDto(hospital);
  }
}
