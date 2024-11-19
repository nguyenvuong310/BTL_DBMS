import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorRepository {
  constructor(@InjectRepository(Doctor) private doctorSchedulerRepository: Repository<Doctor>) {}
  async findByEmail(email: string) {
    return this.doctorSchedulerRepository.findOne({ where: { email } });
  }

  async getPopularDoctor() {
    return this.doctorSchedulerRepository.find({
      order: { rating: 'DESC' },
      take: 10,
      relations: ['hospital', 'specialty'],
    });
  }

  async findDoctorBySpecialty(specialtyId: string) {
    return this.doctorSchedulerRepository.find({
      where: { specialty: { id: specialtyId } },
      relations: ['hospital', 'specialty'],
    });
  }

  async findDoctorByHospital(hospitalId: string) {
    return this.doctorSchedulerRepository.find({
      where: { hospital: { id: hospitalId } },
      relations: ['hospital', 'specialty'],
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.doctorSchedulerRepository.findOne({ where: { refreshToken } });
  }

  async updateRefreshToken(doctorId: string, refreshToken: string) {
    return this.doctorSchedulerRepository.update(doctorId, { refreshToken });
  }
}
