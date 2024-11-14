import { AbstractEntity } from 'src/custom/abstract.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Patient } from 'src/modules/patients/entities/patient.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('feedbacks')
export class Feedback extends AbstractEntity {
  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.feedbacks)
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.feedbacks)
  patient: Patient;
}
