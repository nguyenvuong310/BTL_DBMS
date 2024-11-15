import { AbstractEntity } from '../../../custom/abstract.entity';
import { Patient } from '../../../modules/patients/entities/patient.entity';

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('health_insurances')
export class HealthInsurance extends AbstractEntity {
  @Column()
  gender: string;

  @Column({ unique: true })
  insuranceNumber: string;

  @Column()
  placeOfRegistration: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @OneToOne(() => Patient, (patient) => patient.health_insurance)
  @JoinColumn({ name: 'onwer_id' })
  owner: Patient;
}
