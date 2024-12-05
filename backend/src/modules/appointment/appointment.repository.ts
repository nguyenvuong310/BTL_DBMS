import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentSortDto } from './dto/appointment-sort.dto';

import { StatusType } from 'src/constants/action.enum';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

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

  async findAll(
    currentPage: string,
    limit: string,
    sort: AppointmentSortDto,
    filter: StatusType | null,
    userId: string,
  ): Promise<Appointment[]> {
    const queryBuilder = this.appointmentRepository.createQueryBuilder('appointment');

    queryBuilder
      // Join with doctor_schedule relation
      .leftJoinAndSelect('appointment.doctor_schedule', 'doctor_schedule') // LEFT JOIN doctor_schedule table
      .leftJoinAndSelect('appointment.patient', 'patient') // LEFT JOIN patient table
      .leftJoinAndSelect('doctor_schedule.doctor', 'doctor') // Join doctor related to doctor_schedule
      .leftJoinAndSelect('doctor.hospital', 'hospital') // Join the hospital related to the doctor
      .leftJoinAndSelect('doctor.specialty', 'specialty') // Join the specialty related to the doctor
      // Apply filtering based on appointment status
      .orderBy('doctor_schedule.day', 'DESC')
      .orderBy('doctor_schedule.start_time', 'ASC')
      .orderBy('appointment.createdAt', 'DESC')
      .where('patient.id = :userId', { userId }) // Filter appointments by patient ID
      // Pagination settings: take (limit) and skip (pagination)
      .take(+limit) // Limit the number of results (based on the page size)
      .skip((+currentPage - 1) * +limit); // Skip results based on the current page

    if (filter) {
      queryBuilder.andWhere('appointment.status = :status', { status: filter });
    }
    if (sort?.doctorName) {
      queryBuilder.orderBy('doctor.name', sort.doctorName);
    }
    if (sort?.createdAt) {
      queryBuilder.orderBy('appointment.createdAt', sort.createdAt);
    }
    if (sort?.date) {
      queryBuilder.orderBy('doctor_schedule.day', sort.date);
    }
    if (sort?.time) {
      queryBuilder.orderBy('doctor_schedule.start_time', sort.time);
    }
    if (sort?.hospitalName) {
      queryBuilder.orderBy('hospital.name', sort.hospitalName);
    }

    // Execute the query and return the results
    return await queryBuilder.getMany();
  }

  async countAppointments(userId: string): Promise<number> {
    return this.appointmentRepository.count({ where: { patient: { id: userId } } });
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, userId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    appointment.status = updateAppointmentDto.status;
    appointment.reason_cancel = updateAppointmentDto.reason_cancel;
    appointment.updatedBy = userId;
    return this.appointmentRepository.save(appointment);
  }
}
