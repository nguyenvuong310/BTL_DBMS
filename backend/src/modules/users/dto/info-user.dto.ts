import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';

export class InfoUserDto {
  user: Doctor | Patient;

  role: string;

  constructor(user: Doctor | Patient, role: string) {
    this.user = user;
    this.role = role;
  }
}
