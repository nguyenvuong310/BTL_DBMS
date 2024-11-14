import { Inject, Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionRepository } from './prescription.repository';

@Injectable()
export class PrescriptionService {
  constructor(
    @Inject(PrescriptionRepository)
    private prescriptionRepository: PrescriptionRepository,
  ) {}
  create(createPrescriptionDto: CreatePrescriptionDto) {
    return 'This action adds a new prescription';
  }

  createPrescription(createPrescriptionItemDto: CreatePrescriptionDto) {
    //create prescription
    //get id prescription
    //create prescription item
    return 'This action adds a new prescription';
  }

  async getPrescriptionsByAppointmentId(appointment_id: string) {
    return this.prescriptionRepository.getPrescriptionsByAppointmentId(appointment_id);
  }

  findAll() {
    return `This action returns all prescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescription`;
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`;
  }
}
