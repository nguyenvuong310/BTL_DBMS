import { StatusType } from 'src/constants/action.enum';
import { AbstractEntity } from 'src/custom/abstract.entity';
import { DoctorSchedule } from 'src/modules/doctor_schedules/entities/doctor_schedule.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Prescription } from 'src/modules/prescription/entities/prescription.entity';

import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity('appointments')
export class Appointment extends AbstractEntity {
  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.PENDING, // Set default status to 'pending'
  })
  status: StatusType;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.appointments)
  doctor_schedule: DoctorSchedule;

  @OneToOne(() => Prescription, (prescription) => prescription.appointment)
  prescription: Prescription;
}
