import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { CreateFeedbackDto } from '../feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';
import { PrescriptionService } from '../prescription/prescription.service';
import { PatientRepository } from './patients.repository';

@Injectable()
export class PatientsService {
  constructor(
    @Inject(FeedbacksService)
    private feedbacksService: FeedbacksService,

    @Inject(PrescriptionService)
    private prescriptionService: PrescriptionService,

    @Inject(PatientRepository)
    private patientRepository: PatientRepository,
  ) {}

  async findByEmail(email: string) {
    return this.patientRepository.findByEmail(email);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.patientRepository.findByRefreshToken(refreshToken);
  }

  async updateRefreshToken(patientId: string, refreshToken: string) {
    return this.patientRepository.updateRefreshToken(patientId, refreshToken);
  }

  async viewPrescriptions(appointment_id: string) {
    return this.prescriptionService.getPrescriptionsByAppointmentId(appointment_id);
  }

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }

  async getFeedbacksByDoctorId(doctor_id: string) {
    return this.feedbacksService.getFeedBacksByDoctorId(doctor_id);
  }

  async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbacksService.update(id, updateFeedbackDto);
  }

  async removeFeedback(id: string) {
    return this.feedbacksService.remove(id);
  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
