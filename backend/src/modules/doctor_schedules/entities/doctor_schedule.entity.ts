import { Transform } from 'class-transformer';
import { AbstractEntity } from 'src/custom/abstract.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('doctor_schedules')
export class DoctorSchedule extends AbstractEntity {
  @Column()
  day: string;

  @Column()
  max_slots: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedule)
  doctor: Doctor;

  @Column({ type: 'varchar', length: 5 })
  time: string;

  @OneToMany(() => DoctorSchedule, (doctorSchedule) => doctorSchedule.doctor)
  appointments: DoctorSchedule[];
}
