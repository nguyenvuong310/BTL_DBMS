import { Injectable } from '@nestjs/common';
import { InfoMailBookingSuccessDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  noticeSuccess(infoMail: InfoMailBookingSuccessDto) {
    this.mailerService.sendMail({
      to: 'trungvuong2169@gmail.com',
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'notice',
      context: {
        patientName: infoMail.patientName,
        doctorName: infoMail.doctorName,
        date: infoMail.date,
        time: infoMail.time,
        reason: infoMail.reason,
        hospitalName: infoMail.hospitalName,
        address: infoMail.address,
      },
    });
  }
}
