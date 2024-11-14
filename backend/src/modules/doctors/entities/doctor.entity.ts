import { AbstractEntity } from 'src/custom/abstract.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { DoctorSchedule } from 'src/modules/doctor_schedules/entities/doctor_schedule.entity';
import { Feedback } from 'src/modules/feedbacks/entities/feedback.entity';
import { Hospital } from 'src/modules/hospitals/entities/hospital.entity';
import { Specialty } from 'src/modules/specialty/entities/specialty.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('doctors')
export class Doctor extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  bio: string;

  @Column()
  avatar: string;

  @Column()
  examinationPrice: number;

  @Column()
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
}
