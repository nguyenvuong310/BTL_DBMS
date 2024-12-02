import { StatusType } from '../../../constants/action.enum';
import { AbstractEntity } from '../../../custom/abstract.entity';
import { DoctorSchedule } from '../../../modules/doctor_schedules/entities/doctor_schedule.entity';
import { Patient } from '../../../modules/patients/entities/patient.entity';
import { Prescription } from '../../../modules/prescription/entities/prescription.entity';

import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity('appointments')
export class Appointment extends AbstractEntity {
  @Column()
  reason: string;

  @Column({ nullable: true })
  reason_cancel: string;

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
