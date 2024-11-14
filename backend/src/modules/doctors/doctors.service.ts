import { Inject, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { DoctorRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(
    @Inject(FeedbacksService)
    private feedbacksService: FeedbacksService,

    @Inject(DoctorRepository)
    private doctorRepository: DoctorRepository,
  ) {}

  async getFeedbacksByDoctorId(doctor_id: string) {
    return this.feedbacksService.getFeedBacksByDoctorId(doctor_id);
  }

  async findByEmail(email: string) {
    return this.doctorRepository.findByEmail(email);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.doctorRepository.findByRefreshToken(refreshToken);
  }

  async updateRefreshToken(doctorId: string, refreshToken: string) {
    return this.doctorRepository.updateRefreshToken(doctorId, refreshToken);
  }
}
