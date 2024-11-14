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

  async findByRefreshToken(refreshToken: string) {
    return this.doctorSchedulerRepository.findOne({ where: { refreshToken } });
  }

  async updateRefreshToken(doctorId: string, refreshToken: string) {
    return this.doctorSchedulerRepository.update(doctorId, { refreshToken });
  }
}
