import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientUnRegisterDto } from './dto/create-patient.dto';

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

  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} patient`;
  // }

  async create(createPatientDto: CreatePatientUnRegisterDto) {
    return this.patientRepository.create(createPatientDto);
  }
}
