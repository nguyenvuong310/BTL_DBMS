import { Inject, Injectable } from '@nestjs/common';

import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';

import { InfoUserDto } from './dto/info-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DoctorsService)
    private readonly doctorsService: DoctorsService,

    @Inject(PatientsService)
    private readonly patientsService: PatientsService,
  ) {}

  async findByEmail(email: string): Promise<InfoUserDto> {
    const doctor = await this.doctorsService.findByEmail(email);
    if (doctor) {
      return new InfoUserDto(doctor, 'doctor');
    }
    const patient = await this.patientsService.findByEmail(email);
    if (patient) {
      return new InfoUserDto(patient, 'patient');
    }
    return null;
  }

  isValidPassword(intputPassword: string, password: string): boolean {
    return intputPassword === password;
  }

  async updateRefreshToken(userId: string, refreshToken: string, role: string) {
    if (role === 'doctor') {
      return await this.doctorsService.updateRefreshToken(userId, refreshToken);
    }
    if (role === 'patient') {
      return await this.patientsService.updateRefreshToken(userId, refreshToken);
    }
  }

  async findUserByRefreshToken(refreshToken: string) {
    const doctor = await this.doctorsService.findByRefreshToken(refreshToken);
    if (doctor) {
      return new InfoUserDto(doctor, 'doctor');
    }
    const patient = await this.patientsService.findByRefreshToken(refreshToken);
    if (patient) {
      return new InfoUserDto(patient, 'patient');
    }
    return null;
  }
}
