import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksRepository } from './feedbacks.repository';

@Injectable()
export class FeedbacksService {
  constructor(
    @Inject(FeedbacksRepository)
    private feedbacksRepository: FeedbacksRepository,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksRepository.save(createFeedbackDto);
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksRepository.update(id, updateFeedbackDto);
  }

  async remove(id: string) {
    return this.feedbacksRepository.remove(id);
  }

  async getFeedBacksByDoctorId(doctor_id: string) {
    return this.feedbacksRepository.getFeedBacksByDoctorId(doctor_id);
  }
}
