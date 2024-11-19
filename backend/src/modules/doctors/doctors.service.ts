import { Inject, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { DoctorRepository } from './doctors.repository';
import { InfoDoctorDto } from './dto/info-doctor.dto';

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

  async getPopularDoctor(): Promise<InfoDoctorDto[]> {
    const doctors = await this.doctorRepository.getPopularDoctor();
    return doctors.map((doctor) => new InfoDoctorDto(doctor));
  }

  async getDoctorBySpecialty(specialty_id: string) {
    const doctors = await this.doctorRepository.findDoctorBySpecialty(specialty_id);
    return doctors.map((doctor) => new InfoDoctorDto(doctor));
  }

  async getDoctorByHospital(hospital_id: string) {
    const doctors = await this.doctorRepository.findDoctorByHospital(hospital_id);
    return doctors.map((doctor) => new InfoDoctorDto(doctor));
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
