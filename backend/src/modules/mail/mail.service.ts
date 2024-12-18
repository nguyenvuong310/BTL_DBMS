import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { UserDto } from '../users/dto/user.dto';
import { InfoAppointmentDto } from '../appointment/dto/info-appointment.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async noticeSuccess(infoMail: InfoAppointmentDto, user: UserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'notice',
      context: {
        patientName: infoMail.patientName,
        doctorName: infoMail.doctorName,
        date: infoMail.date,
        time: infoMail.start_time + ' - ' + infoMail.end_time,
        reason: infoMail.reason,
        hospitalName: infoMail.hospitalName,
        address: infoMail.address,
      },
    });
  }

  async noticeCancelByPatient(infoMail: InfoAppointmentDto, user: UserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'noticeCancelByPatient',
      context: {
        patientName: infoMail.patientName,
        doctorName: infoMail.doctorName,
        date: infoMail.date,
        time: infoMail.start_time + ' - ' + infoMail.end_time,
        hospitalName: infoMail.hospitalName,
        address: infoMail.address,
        reason_cancel: infoMail.reason_cancel,
      },
    });
  }

  async noticeCancelByDoctor(infoMail: InfoAppointmentDto, user: UserDto) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'noticeCancelByDoctor',
      context: {
        patientName: infoMail.patientName,
        doctorName: infoMail.doctorName,
        date: infoMail.date,
        time: infoMail.start_time + ' - ' + infoMail.end_time,
        reason: infoMail.reason,
        hospitalName: infoMail.hospitalName,
        address: infoMail.address,
        reason_cancel: infoMail.reason_cancel,
      },
    });
  }
}
