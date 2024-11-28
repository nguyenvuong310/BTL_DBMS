import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionRepository {
  constructor(@InjectRepository(Prescription) private PrescriptionRepository: Repository<Prescription>) {}

  async getPrescriptionsByAppointmentId(appointment_id: string): Promise<Prescription[]> {
    return this.PrescriptionRepository.find({
      where: { appointment: { id: appointment_id } },
      relations: ['medicines', 'prescription_items'],
    });
  }

  async save(prescription: Prescription): Promise<Prescription> {
    return this.PrescriptionRepository.save(prescription);
  }

  async edit(id: string, prescription: Prescription): Promise<Prescription> {
    return this.PrescriptionRepository.save({ ...prescription, id });
  }
}
