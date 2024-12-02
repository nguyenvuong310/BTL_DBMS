import { Controller, Get } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@Controller('mail')
@ApiTags('Mail')
export class MailController {
  constructor(private readonly mailerService: MailerService) {}
  // @Cron(CronExpression.EVERY_MINUTE)
  // async handleTestEmail() {
  //   await this.mailerService.sendMail({
  //     to: 'my.nguyencse21@hcmut.edu.vn',
  //     from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     template: 'notice',
  //     context: {
  //       customerName: 'Nguyen Thi Mai',
  //       bookingReference: 'ABC123456',
  //       serviceName: 'General Health Check-up',
  //       appointmentDate: '2024-12-05',
  //       appointmentTime: '10:00 AM',
  //       location: 'HealthCare Clinic, 123 ABC Street, Hanoi',
  //       contactLink: 'https://healthcareclinic.vn/contact',
  //     },
  //   });
  // }

  // @Get()
  // @Public()
  // async testEmail() {
  //   await this.mailerService.sendMail({
  //     to: 'trungvuong2169@gmail.com',
  //     from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     template: 'notice',
  //     context: {
  //       customerName: 'Nguyen Thi Mai',
  //       bookingReference: 'ABC123456',
  //       serviceName: 'General Health Check-up',
  //       appointmentDate: '2024-12-05',
  //       appointmentTime: '10:00 AM',
  //       location: 'HealthCare Clinic, 123 ABC Street, Hanoi',
  //       contactLink: 'https://healthcareclinic.vn/contact',
  //     },
  //   });
  // }
}
