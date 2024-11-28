import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

import { PatientsService } from '../patients/patients.service';

import { AppointmentRepository } from './appointment.repository';
import { InfoAppointmentDto } from './dto/info-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject(PatientsService)
    private patientsService: PatientsService,
    @Inject(AppointmentRepository)
    private appointmentRepository: AppointmentRepository,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    const appointment = await this.appointmentRepository.save(createAppointmentDto, userId);
    const infoAppointment = await this.appointmentRepository.getInfoAppointment(appointment.id);
    return new InfoAppointmentDto(infoAppointment);
  }
}
