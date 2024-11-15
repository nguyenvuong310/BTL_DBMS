import { AbstractEntity } from '../../../custom/abstract.entity';
import { Doctor } from '../../../modules/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('hospitals')
export class Hospital extends AbstractEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctors: Doctor[];
}
