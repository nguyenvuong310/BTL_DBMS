import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksRepository {
  constructor(@InjectRepository(Feedback) private feedbacksRepository: Repository<Feedback>) {}

  async save(feedback: CreateFeedbackDto, doctor_id: string, patient_id: string): Promise<Feedback> {
    return this.feedbacksRepository.save({
      ...feedback,
      doctor: { id: doctor_id },
      patient: { id: patient_id },
    });
  }

  async update(id: string, feedback: UpdateFeedbackDto): Promise<Feedback> {
    return this.feedbacksRepository.save({ ...feedback, id });
  }

  async remove(id: string): Promise<void> {
    await this.feedbacksRepository.delete(id);
  }

  async getFeedBacksByDoctorId(doctor_id: string): Promise<Feedback[]> {
    return this.feedbacksRepository.find({
      where: { doctor: { id: doctor_id } },
      relations: ['doctor', 'patient'],
      order: { createdAt: 'DESC' },
    });
  }
}
