import { AbstractEntity } from 'src/custom/abstract.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('health_insurances')
export class HealthInsurance extends AbstractEntity {
  @Column()
  gender: string;

  @Column()
  insuranceNumber: string;

  @Column()
  placeOfRegistration: string;

  @Column()
  timeStart: Date;

  @Column()
  timeEnd: Date;

  @OneToOne(() => Patient, (patient) => patient.health_insurance)
  @JoinColumn({ name: 'patient_id' })
  owner: Patient;
}
