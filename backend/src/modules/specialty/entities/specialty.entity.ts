import { AbstractEntity } from 'src/custom/abstract.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('specialties')
export class Specialty extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  avatar: string;

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[];
}
