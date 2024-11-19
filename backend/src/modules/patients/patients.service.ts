import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { CreateFeedbackDto } from '../feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';
import { PrescriptionService } from '../prescription/prescription.service';
import { PatientRepository } from './patients.repository';

@Injectable()
export class PatientsService {
  constructor(
    @Inject(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  async findByEmail(email: string) {
    return this.patientRepository.findByEmail(email);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.patientRepository.findByRefreshToken(refreshToken);
  }

  async updateRefreshToken(patientId: string, refreshToken: string) {
    return this.patientRepository.updateRefreshToken(patientId, refreshToken);
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
