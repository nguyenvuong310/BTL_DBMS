import { Inject, Injectable } from '@nestjs/common';
import { CreatePrescriptionItemDto } from './dto/create-prescription_item.dto';

import { PrescriptionItemsRepository } from './prescription_items.repository';
import { PrescriptionItem } from './entities/prescription_item.entity';
import { Prescription } from '../prescription/entities/prescription.entity';
import { Medicine } from '../medicine/entities/medicine.entity';

import { QueryRunner } from 'typeorm';
import { MedicineService } from '../medicine/medicine.service';

@Injectable()
export class PrescriptionItemsService {
  constructor(
    @Inject(PrescriptionItemsRepository)
    private prescriptionItemsRepository: PrescriptionItemsRepository,

    @Inject(MedicineService)
    private medicineService: MedicineService,
  ) {}

  async create(
    createPrescriptionItemsDto: CreatePrescriptionItemDto[],
    prescription: Prescription,
    queryRunner: QueryRunner,
  ): Promise<PrescriptionItem[]> {
    const prescription_items: PrescriptionItem[][] = await Promise.all(
      createPrescriptionItemsDto.map(async (item) => {
        const itemsForStatus = await Promise.all(
          item.status.map(async (status) => {
            const prescriptionItem = new PrescriptionItem();

            prescriptionItem.prescription = prescription;
            prescriptionItem.medicine = await this.medicineService.findById(item.medicineId);
            prescriptionItem.dosage = item.dosage;
            prescriptionItem.status = status;

            return prescriptionItem;
          }),
        );

        return itemsForStatus;
      }),
    );

    const flattenedPrescriptionItems = prescription_items.flat();
    return this.prescriptionItemsRepository.save(flattenedPrescriptionItems, queryRunner);
  }
}
