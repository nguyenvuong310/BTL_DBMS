import { Doctor } from '../../../modules/doctors/entities/doctor.entity';
import { AbstractEntity } from '../../../custom/abstract.entity';
import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { PrescriptionItem } from '../../../modules/prescription_items/entities/prescription_item.entity';

import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity('prescriptions')
export class Prescription extends AbstractEntity {
  @OneToOne(() => Appointment, (appointment) => appointment.prescription)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @OneToMany(() => PrescriptionItem, (prescriptionItem) => prescriptionItem.prescription)
  prescription_items: PrescriptionItem[];

  @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions)
  doctor: Doctor;
}
