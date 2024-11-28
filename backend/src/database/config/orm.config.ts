import { Prescription } from '../../modules/prescription/entities/prescription.entity';
import { Appointment } from '../../modules/appointment/entities/appointment.entity';
import { DoctorSchedule } from '../../modules/doctor_schedules/entities/doctor_schedule.entity';
import { Doctor } from '../../modules/doctors/entities/doctor.entity';
import { Feedback } from '../../modules/feedbacks/entities/feedback.entity';
import { HealthInsurance } from '../../modules/health_insurance/entities/health_insurance.entity';
import { Hospital } from '../../modules/hospitals/entities/hospital.entity';
import { Medicine } from '../../modules/medicine/entities/medicine.entity';
import { Patient } from '../../modules/patients/entities/patient.entity';
import { PrescriptionItem } from '../../modules/prescription_items/entities/prescription_item.entity';
import { Specialty } from '../../modules/specialty/entities/specialty.entity';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dbms',
  database: 'healthcare',
  entities: [
    Hospital,
    Doctor,
    Specialty,
    DoctorSchedule,
    Feedback,
    HealthInsurance,
    Patient,
    Medicine,
    PrescriptionItem,
    Appointment,
    PrescriptionItem,
    Prescription,
  ],
  synchronize: true,
  migrations: ['src/database/migrations/**/*.ts'],
});
