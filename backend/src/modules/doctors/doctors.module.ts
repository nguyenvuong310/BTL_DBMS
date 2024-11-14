import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { DoctorRepository } from './doctors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), FeedbacksModule, PrescriptionModule],
  controllers: [DoctorsController],
  providers: [DoctorsService, DoctorRepository],
  exports: [DoctorsService],
})
export class DoctorsModule {}
