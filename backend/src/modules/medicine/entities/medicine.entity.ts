import { AbstractEntity } from '../../../custom/abstract.entity';
import { PrescriptionItem } from '../../../modules/prescription_items/entities/prescription_item.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('medicines')
export class Medicine extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => PrescriptionItem, (prescription_item) => prescription_item.medicine)
  prescription_items: PrescriptionItem[];
}
