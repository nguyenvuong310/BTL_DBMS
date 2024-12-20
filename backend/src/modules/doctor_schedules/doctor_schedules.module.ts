import { Module } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor_schedules.service';
import { DoctorSchedulesController } from './doctor_schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedule } from './entities/doctor_schedule.entity';
import { DoctorSchedulerRepository } from './doctor_schedulers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorSchedule])],
  controllers: [DoctorSchedulesController],
  providers: [DoctorSchedulesService, DoctorSchedulerRepository],
  exports: [DoctorSchedulesService],
})
export class DoctorSchedulesModule {}
