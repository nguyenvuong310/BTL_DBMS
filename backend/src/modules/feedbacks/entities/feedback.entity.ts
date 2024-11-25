import { AbstractEntity } from '../../../custom/abstract.entity';
import { Doctor } from '../../../modules/doctors/entities/doctor.entity';
import { Patient } from '../../../modules/patients/entities/patient.entity';
import { AfterInsert, Column, Entity, getRepository, ManyToOne } from 'typeorm';
import { dataSource } from '../../../database/config/orm.config';

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

  @AfterInsert()
  async updateDoctorRating() {
    const feedbackRepository = dataSource.getRepository(Feedback);
    const avgRating = await feedbackRepository
      .createQueryBuilder('feedback')
      .select('CEIL(AVG(feedback.rating))', 'avgRating')
      .where('feedback.doctorId = :doctorId', { doctorId: this.doctor?.id })
      .getRawOne();

    console.log(avgRating.avgRating);

    const doctorRepository = dataSource.getRepository(Doctor);
    await doctorRepository.update(this.doctor?.id, { rating: avgRating.avgRating });
  }
}
