import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { Prescription } from './entities/prescription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionRepository } from './prescription.repository';
import { PrescriptionItemsModule } from '../prescription_items/prescription_items.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription]), PrescriptionItemsModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, PrescriptionRepository],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}
