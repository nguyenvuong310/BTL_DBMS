import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksRepository } from './feedbacks.repository';
import { In } from 'typeorm';
import { InfoFeedbackDto } from './dto/info-feedback.dto';
import { FeedbackDoctorsDto } from './dto/feedback-doctor.dto';

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

  async getFeedBacksByDoctorId(doctor_id: string): Promise<FeedbackDoctorsDto> {
    const feedbacks = await this.feedbacksRepository.getFeedBacksByDoctorId(doctor_id);
    if (feedbacks.length === 0) {
      return new FeedbackDoctorsDto({}, [], null);
    }
    const doctor = feedbacks[0].doctor;
    const ratingCounts = feedbacks.reduce((acc, feedback) => {
      const rating = feedback.rating;
      const ratingKey = `star${rating}`; // Create a key like "5Star", "4Star", etc.
      acc[ratingKey] = (acc[ratingKey] || 0) + 1;
      return acc;
    }, {});
    const inforFeedback = feedbacks.map((feedback) => new InfoFeedbackDto(feedback));
    return new FeedbackDoctorsDto(ratingCounts, inforFeedback, doctor);
  }
}
