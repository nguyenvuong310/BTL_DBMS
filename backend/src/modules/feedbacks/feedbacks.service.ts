import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksRepository } from './feedbacks.repository';
import { In } from 'typeorm';
import { InfoFeedbackDto } from './dto/info-feedback.dto';

@Injectable()
export class FeedbacksService {
  constructor(
    @Inject(FeedbacksRepository)
    private feedbacksRepository: FeedbacksRepository,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto, doctor_id: string, patient_id: string) {
    const feedback = await this.feedbacksRepository.save(createFeedbackDto, doctor_id, patient_id);
    return new InfoFeedbackDto(feedback);
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksRepository.update(id, updateFeedbackDto);
  }

  async remove(id: string) {
    return this.feedbacksRepository.remove(id);
  }

  async getFeedBacksByDoctorId(doctor_id: string): Promise<InfoFeedbackDto[]> {
    const feedbacks = await this.feedbacksRepository.getFeedBacksByDoctorId(doctor_id);
    return feedbacks.map((feedback) => new InfoFeedbackDto(feedback));
  }
}
