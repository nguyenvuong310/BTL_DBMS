import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentSortDto } from './dto/appointment-sort.dto';

import { Role, StatusType } from 'src/constants/action.enum';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UserDto } from '../users/dto/user.dto';

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
      .leftJoinAndSelect('appointment.doctor_schedule', 'doctor_schedule')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('doctor_schedule.doctor', 'doctor')
      .leftJoinAndSelect('doctor.hospital', 'hospital')
      .leftJoinAndSelect('appointment.prescription', 'prescription')
      .orderBy({
        'doctor_schedule.day': 'DESC',
        'doctor_schedule.start_time': 'ASC',
        'appointment.createdAt': 'DESC',
      })
      .where('patient.id = :userId', { userId })
      .orWhere('doctor.id = :userId', { userId })
      .take(+limit)
      .skip((+currentPage - 1) * +limit);

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

  async countAppointments(user: UserDto): Promise<number> {
    if (user.role === Role.PATIENT) {
      return this.appointmentRepository.count({ where: { patient: { id: user?.id } } });
    }
    return this.appointmentRepository.count({
      where: { doctor_schedule: { doctor: { id: user?.id } } },
      relations: ['doctor_schedule', 'doctor_schedule.doctor'],
    });
  }
  timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes; // Convert time to total minutes
  };
  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, userId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor_schedule'] });
    const currentTime = new Date();
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const appointmentTimeInMinutes = this.timeToMinutes(appointment.doctor_schedule.start_time);
    const twelveHoursInMinutes = 12 * 60;

    if (currentTimeInMinutes - appointmentTimeInMinutes > twelveHoursInMinutes) {
      throw new Error('You can only cancel an appointment 12 hours before the appointment time');
    }

    appointment.status = updateAppointmentDto.status;
    appointment.reason_cancel = updateAppointmentDto.reason_cancel;
    appointment.updatedBy = userId;
    return this.appointmentRepository.save(appointment);
  }
}
