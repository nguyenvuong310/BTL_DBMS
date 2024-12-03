import { Prescription } from 'src/modules/prescription/entities/prescription.entity';
import { AbstractEntity } from '../../../custom/abstract.entity';
import { DoctorSchedule } from '../../../modules/doctor_schedules/entities/doctor_schedule.entity';
import { Feedback } from '../../../modules/feedbacks/entities/feedback.entity';
import { Hospital } from '../../../modules/hospitals/entities/hospital.entity';
import { Specialty } from '../../../modules/specialty/entities/specialty.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('doctors')
export class Doctor extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  bio: string;

  @Column()
  avatar: string;

  @Column({ default: 300001 })
  examinationPrice: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ type: 'varchar', length: 512, nullable: true })
  refreshToken: string;

  @ManyToOne(() => Hospital, (hospital) => hospital.doctors)
  hospital: Hospital;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors)
  specialty: Specialty;

  @OneToMany(() => DoctorSchedule, (doctorTime) => doctorTime.doctor)
  schedule: DoctorSchedule[];

  @OneToMany(() => Feedback, (feedback) => feedback.doctor)
  feedbacks: Feedback[];

  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];
}
