import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { HospitalsModule } from './modules/hospitals/hospitals.module';
import { DoctorSchedulesModule } from './modules/doctor_schedules/doctor_schedules.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PatientsModule } from './modules/patients/patients.module';

import { HealthInsuranceModule } from './modules/health_insurance/health_insurance.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { SearchModule } from './modules/search/search.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { PrescriptionItemsModule } from './modules/prescription_items/prescription_items.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { MailModule } from './modules/mail/mail.module';
@Module({
  imports: [
    AuthModule,
    HospitalsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: configService.get<string>('MYSQL_ROOT_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    DoctorsModule,
    SpecialtyModule,
    PrescriptionItemsModule,
    PrescriptionModule,
    PatientsModule,
    MedicineModule,
    HealthInsuranceModule,
    FeedbacksModule,
    DoctorSchedulesModule,
    AppointmentModule,
    SearchModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
