import { Injectable, Inject } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionItem } from './entities/prescription_item.entity';
import { CreatePrescriptionItemDto } from './dto/create-prescription_item.dto';

@Injectable()
export class PrescriptionItemsRepository {
  constructor(@InjectRepository(PrescriptionItem) private healthInsuranceRepository: Repository<PrescriptionItem>) {}

  async save(prescription_items: PrescriptionItem[], queryRunner: QueryRunner): Promise<PrescriptionItem[]> {
    return queryRunner.manager.save(prescription_items);
  }
}
