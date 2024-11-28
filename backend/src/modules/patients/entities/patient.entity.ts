import { AbstractEntity } from '../../../custom/abstract.entity';
import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { Feedback } from '../../../modules/feedbacks/entities/feedback.entity';
import { HealthInsurance } from '../../../modules/health_insurance/entities/health_insurance.entity';

import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('patients')
export class Patient extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  birthDate: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  refreshToken: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => HealthInsurance, (health_insurance) => health_insurance.owner)
  health_insurance: HealthInsurance;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Feedback, (feedback) => feedback.patient)
  feedbacks: Feedback[];
}
