import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { App } from 'aws-sdk/clients/opsworks';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentRepository {
  constructor(@InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>) {}

  async save(appointment: CreateAppointmentDto, userId: string): Promise<Appointment> {
    return this.appointmentRepository.save({
      ...appointment,
      patient: { id: userId },
      doctor_schedule: { id: appointment.scheduleId },
    });
  }

  async getInfoAppointment(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: [
        'patient',
        'doctor_schedule',
        'doctor_schedule.doctor',
        'doctor_schedule.doctor.hospital',
        'doctor_schedule.doctor.specialty',
      ],
    });
  }
}
