import { Module } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor_schedules.service';
import { DoctorSchedulesController } from './doctor_schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedule } from './entities/doctor_schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorSchedule])],
  controllers: [DoctorSchedulesController],
  providers: [DoctorSchedulesService],
})
export class DoctorSchedulesModule {}
