import { Inject, Injectable } from '@nestjs/common';
import { CreatePrescriptionItemDto } from './dto/create-prescription_item.dto';
import { UpdatePrescriptionItemDto } from './dto/update-prescription_item.dto';
import { PrescriptionItemsRepository } from './prescription_items.repository';

@Injectable()
export class PrescriptionItemsService {
  constructor(
    @Inject(PrescriptionItemsRepository)
    private prescriptionItemsRepository: PrescriptionItemsRepository,
  ) {}

  create(createPrescriptionItemsDto: CreatePrescriptionItemDto[]) {
    return this.prescriptionItemsRepository.save(createPrescriptionItemsDto);
  }

  findAll() {
    return `This action returns all prescriptionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescriptionItem`;
  }

  update(id: number, updatePrescriptionItemDto: UpdatePrescriptionItemDto) {
    return `This action updates a #${id} prescriptionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescriptionItem`;
  }
}
