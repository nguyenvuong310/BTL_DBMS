import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientRepository {
  constructor(@InjectRepository(Patient) private patientSchedulerRepository: Repository<Patient>) {}
  async findByEmail(email: string) {
    return this.patientSchedulerRepository.findOne({ where: { email } });
  }

  async findByRefreshToken(refreshToken: string) {
    console.log('refreshToken', refreshToken);
    const a = await this.patientSchedulerRepository.findOne({ where: { refreshToken } });

    return this.patientSchedulerRepository.findOne({ where: { refreshToken } });
  }

  async updateRefreshToken(patientId: string, refreshToken: string) {
    return this.patientSchedulerRepository.update(patientId, { refreshToken });
  }
}
