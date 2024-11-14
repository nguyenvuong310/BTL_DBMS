import { AbstractEntity } from 'src/custom/abstract.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Feedback } from 'src/modules/feedbacks/entities/feedback.entity';
import { HealthInsurance } from 'src/modules/health_insurance/entities/health_insurance.entity';

import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('patients')
export class Patient extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  refreshToken: string;

  @Column()
  bio: string;

  @Column()
  avatar: string;

  @OneToOne(() => HealthInsurance, (health_insurance) => health_insurance.owner)
  health_insurance: HealthInsurance;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Feedback, (feedback) => feedback.patient)
  feedbacks: Feedback[];
}
