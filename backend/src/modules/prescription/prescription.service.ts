import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

import { PrescriptionRepository } from './prescription.repository';
import { PrescriptionItemsService } from '../prescription_items/prescription_items.service';
import { DataSource, QueryRunner } from 'typeorm';
import { InfoPrescriptionDto } from './dto/info-prescription.dto';
import { TimePeriod } from '../../constants/action.enum';
import { PrescriptionItem } from '../prescription_items/entities/prescription_item.entity';
import { InfoPrescriptionItemsDto } from '../prescription_items/dto/info-prescription_items.dto';
import { UserDto } from '../users/dto/user.dto';
@Injectable()
export class PrescriptionService {
  constructor(
    @Inject(PrescriptionRepository)
    private prescriptionRepository: PrescriptionRepository,

    @Inject(PrescriptionItemsService)
    private prescriptionItemsService: PrescriptionItemsService,

    private readonly dataSource: DataSource,
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto, doctorId: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const prescription = await this.createPrescription(createPrescriptionDto.appointmentId, doctorId, queryRunner);

      const prescription_items = await this.prescriptionItemsService.create(
        createPrescriptionDto.prescriptionItems,
        prescription,
        queryRunner,
      );

      console.log(prescription_items);

      const groupedByStatus = this.groupPrescriptionItemsByStatus(prescription_items);

      const newPrescriptionItems = new InfoPrescriptionDto();
      newPrescriptionItems.morning = groupedByStatus[TimePeriod.MORNING] || [];
      newPrescriptionItems.afternoon = groupedByStatus[TimePeriod.AFTERNOON] || [];
      newPrescriptionItems.evening = groupedByStatus[TimePeriod.EVENING] || [];

      await queryRunner.commitTransaction();

      return newPrescriptionItems;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createPrescription(appointment_id: string, doctor_id: string, queryRunner: QueryRunner) {
    return this.prescriptionRepository.save(appointment_id, doctor_id, queryRunner);
  }

  async findPrescription(appointment_id: string, user: UserDto) {
    const prescription = await this.prescriptionRepository.findByAppointmentId(appointment_id);

    if (prescription && prescription.appointment && prescription?.appointment?.patient?.id !== user.id) {
      throw new NotFoundException('Prescription not found');
    }
    if (!prescription) {
      return new InfoPrescriptionDto();
    }

    const groupedByStatus = this.groupPrescriptionItemsByStatus(prescription.prescription_items);

    const newPrescriptionItems = new InfoPrescriptionDto();
    newPrescriptionItems.morning = groupedByStatus[TimePeriod.MORNING] || [];
    newPrescriptionItems.afternoon = groupedByStatus[TimePeriod.AFTERNOON] || [];
    newPrescriptionItems.evening = groupedByStatus[TimePeriod.EVENING] || [];

    return newPrescriptionItems;
  }

  private groupPrescriptionItemsByStatus(prescription_items: PrescriptionItem[]) {
    return prescription_items.reduce((acc, item) => {
      if (!acc[item.status]) {
        acc[item.status] = [];
      }

      const info = new InfoPrescriptionItemsDto();
      info.dosage = item.dosage;
      info.medicine_name = item.medicine.name;

      acc[item.status].push(info);

      return acc;
    }, {} as Record<string, InfoPrescriptionItemsDto[]>);
  }
}
