import { Injectable } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';

import { Appointment } from '../appointment/entities/appointment.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

@Injectable()
export class PrescriptionRepository {
  constructor(@InjectRepository(Prescription) private PrescriptionRepository: Repository<Prescription>) {}

  async getPrescriptionsByAppointmentId(appointment_id: string): Promise<Prescription[]> {
    return this.PrescriptionRepository.find({
      where: { appointment: { id: appointment_id } },
      relations: ['medicines', 'prescription_items'],
    });
  }

  async save(appointment_id: string, doctor_id: string, queryRunner: QueryRunner): Promise<Prescription> {
    const prescription = new Prescription();
    prescription.appointment = { id: appointment_id } as Appointment;
    prescription.doctor = { id: doctor_id } as Doctor;
    return await queryRunner.manager.save(prescription);
  }

  async edit(id: string, prescription: Prescription): Promise<Prescription> {
    return this.PrescriptionRepository.save({ ...prescription, id });
  }

  async findByAppointmentId(appointment_id: string): Promise<Prescription> {
    return this.PrescriptionRepository.findOne({
      where: { appointment: { id: appointment_id } },
      relations: ['prescription_items.medicine', 'prescription_items'],
    });
  }
}
