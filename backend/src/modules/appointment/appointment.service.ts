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

@Injectable()
export class AppointmentService {
  constructor(
    @Inject(PatientsService)
    private patientsService: PatientsService,
    @Inject(AppointmentRepository)
    private appointmentRepository: AppointmentRepository,
    @Inject(MailService)
    private mailService: MailService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, user: UserDto) {
    const appointment = await this.appointmentRepository.save(createAppointmentDto, user?.id);
    const infoAppointment = await this.appointmentRepository.getInfoAppointment(appointment.id);
    const infoAppointmentDto = new InfoAppointmentDto(infoAppointment);
    this.mailService.noticeSuccess(infoAppointmentDto, user);
    return infoAppointmentDto;
  }

  async findAll(currentPage: string, limit: string, sort: string, filter: StatusType | null, userId: string) {
    const appointmentSort = new AppointmentSortDto(sort);
    const appointmentPaging = await this.appointmentRepository.findAll(
      currentPage,
      limit,
      appointmentSort,
      filter,
      userId,
    );

    const infoAppointment = appointmentPaging.map((appointment) => new InfoAppointmentDto(appointment));
    return new AppointmentList(+limit, +currentPage, appointmentPaging.length, infoAppointment);
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, user: UserDto) {
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
  }
}
