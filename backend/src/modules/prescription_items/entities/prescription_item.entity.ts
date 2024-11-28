import { TimePeriod } from '../../../constants/action.enum';
import { AbstractEntity } from '../../../custom/abstract.entity';
import { Medicine } from '../../../modules/medicine/entities/medicine.entity';
import { Prescription } from '../../../modules/prescription/entities/prescription.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('prescription_items')
export class PrescriptionItem extends AbstractEntity {
  @ManyToOne(() => Prescription, (prescription) => prescription.prescription_items)
  prescription: Prescription;

  @ManyToOne(() => Medicine, (medicine) => medicine.prescription_items)
  medicine: Medicine;

  @Column({ nullable: false })
  dosage: string;

  @Column({
    type: 'enum',
    enum: TimePeriod,
    nullable: false,
  })
  status: TimePeriod;
}
