import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionItem } from './entities/prescription_item.entity';
import { CreatePrescriptionItemDto } from './dto/create-prescription_item.dto';

@Injectable()
export class PrescriptionItemsRepository {
  constructor(@InjectRepository(PrescriptionItem) private healthInsuranceRepository: Repository<PrescriptionItem>) {}

  async save(prescription_items: CreatePrescriptionItemDto[]): Promise<PrescriptionItem[]> {
    return this.healthInsuranceRepository.save(prescription_items);
  }
}
