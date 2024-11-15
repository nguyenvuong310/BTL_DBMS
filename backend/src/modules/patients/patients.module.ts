import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { PatientRepository } from './patients.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), FeedbacksModule, PrescriptionModule],
  controllers: [PatientsController],
  providers: [PatientsService, PatientRepository],
  exports: [PatientsService],
})
export class PatientsModule {}
