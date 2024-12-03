import { Inject, Injectable } from '@nestjs/common';

import { MedicineRepository } from './medicine.repository';
import { InfoMedicineDto } from './dto/info-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    @Inject(MedicineRepository)
    private medicineRepository: MedicineRepository,
  ) {}

  async findAll(exceptListId: string[]) {
    const medicines = await this.medicineRepository.findAll(exceptListId);
    return medicines.map((medicine) => new InfoMedicineDto(medicine.id, medicine.name));
  }

  async findById(id: string) {
    return await this.medicineRepository.findById(id);
  }
}
