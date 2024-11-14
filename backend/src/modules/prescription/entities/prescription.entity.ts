import { AbstractEntity } from 'src/custom/abstract.entity';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { PrescriptionItem } from 'src/modules/prescription_items/entities/prescription_item.entity';

import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('prescriptions')
export class Prescription extends AbstractEntity {
  @OneToOne(() => Appointment, (appointment) => appointment.prescription)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @OneToMany(() => PrescriptionItem, (prescriptionItem) => prescriptionItem.prescription)
  prescription_items: PrescriptionItem[];
}
