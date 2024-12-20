import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

import { PatientsService } from '../patients/patients.service';

import { AppointmentRepository } from './appointment.repository';
import { InfoAppointmentDto } from './dto/info-appointment.dto';
import { AppointmentSortDto } from './dto/appointment-sort.dto';

import { Role, StatusType } from '../../constants/action.enum';
import { AppointmentList } from './dto/appointment-list.dto';
import { MailService } from '../mail/mail.service';
import { UserDto } from '../users/dto/user.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DoctorSchedulesService } from '../doctor_schedules/doctor_schedules.service';
import { isTimeOverlap } from '../../utils/TimeToMinutes';
@Injectable()
export class AppointmentService {
  constructor(
    @Inject(PatientsService)
    private patientsService: PatientsService,
    @Inject(AppointmentRepository)
    private appointmentRepository: AppointmentRepository,
    @Inject(MailService)
    private mailService: MailService,
    @Inject(DoctorSchedulesService)
    private doctorSchedulesService: DoctorSchedulesService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, user: UserDto) {
    const doctorSchedule = await this.doctorSchedulesService.findById(createAppointmentDto.scheduleId);
    if (!doctorSchedule) {
      throw new Error('Doctor schedule not found');
    }
    const existingAppointments = await this.appointmentRepository.findAllAppointmentByPatientId(user?.id);
    let hasOverlap = false;
    for (const existingAppointment of existingAppointments) {
      if (
        isTimeOverlap(
          existingAppointment.doctor_schedule.start_time,
          existingAppointment.doctor_schedule.end_time,
          doctorSchedule.start_time,
          doctorSchedule.end_time,
        )
      ) {
        hasOverlap = true;
        break;
      }
    }

    if (hasOverlap) {
      throw new Error('This appointment overlaps with an existing one. Please choose a different time.');
    }
    const appointment = await this.appointmentRepository.save(createAppointmentDto, user?.id);
    const infoAppointment = await this.appointmentRepository.getInfoAppointment(appointment.id);
    const infoAppointmentDto = new InfoAppointmentDto(infoAppointment);
    this.mailService.noticeSuccess(infoAppointmentDto, user);
    return infoAppointmentDto;
  }

  async findAll(currentPage: string, limit: string, sort: string, filter: StatusType | null, user: UserDto) {
    const appointmentSort = new AppointmentSortDto(sort);
    const appointmentPaging = await this.appointmentRepository.findAll(
      currentPage,
      limit,
      appointmentSort,
      filter,
      user?.id,
    );
    const totalItems = await this.appointmentRepository.countAppointments(user);
    const infoAppointment = appointmentPaging.map((appointment) => new InfoAppointmentDto(appointment));
    return new AppointmentList(+limit, +currentPage, totalItems, infoAppointment);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, user: UserDto) {
    try {
      const appointment = await this.appointmentRepository.update(id, updateAppointmentDto, user?.id);
      const infoAppointment = await this.appointmentRepository.getInfoAppointment(appointment.id);
      const infoAppointmentDto = new InfoAppointmentDto(infoAppointment);
      if (user.role === Role.PATIENT) {
        this.mailService.noticeCancelByPatient(infoAppointmentDto, user);
      }
      if (user.role === Role.DOCTOR) {
        this.mailService.noticeCancelByDoctor(infoAppointmentDto, user);
      }
      return infoAppointmentDto;
    } catch (error) {
      throw error;
    }
  }
}
