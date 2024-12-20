import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientsModule } from '../patients/patients.module';
import { AppointmentRepository } from './appointment.repository';
import Mail from 'nodemailer/lib/mailer';
import { MailModule } from '../mail/mail.module';
import { DoctorSchedulesModule } from '../doctor_schedules/doctor_schedules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), PatientsModule, MailModule, DoctorSchedulesModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}
