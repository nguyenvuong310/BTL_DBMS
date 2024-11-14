import { AbstractEntity } from 'src/custom/abstract.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('hospitals')
export class Hospital extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  bio: string;

  @Column()
  avatar: string;

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctors: Doctor[];
}
