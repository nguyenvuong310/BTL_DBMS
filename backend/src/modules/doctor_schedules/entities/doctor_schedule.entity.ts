import { AbstractEntity } from '../../../custom/abstract.entity';
import { Doctor } from '../../../modules/doctors/entities/doctor.entity';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('doctor_schedules')
export class DoctorSchedule extends AbstractEntity {
  @Column({ nullable: true })
  day: Date;

  @Column()
  max_slots: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedule)
  doctor: Doctor;

  @Column({ type: 'varchar', length: 5 })
  start_time: string;

  @Column({ type: 'varchar', length: 5 })
  end_time: string;

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.doctor)
  appointments: DoctorSchedule[];
}
