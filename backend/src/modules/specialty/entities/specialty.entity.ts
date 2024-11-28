import { AbstractEntity } from '../../../custom/abstract.entity';
import { Doctor } from '../../../modules/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('specialties')
export class Specialty extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  logo: string;

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[];
}
