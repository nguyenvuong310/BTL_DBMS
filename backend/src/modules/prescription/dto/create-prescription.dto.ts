import { CreatePrescriptionItemDto } from '../../../modules/prescription_items/dto/create-prescription_item.dto';

export class CreatePrescriptionDto {
  appointmentId: string;

  prescriptionItems: CreatePrescriptionItemDto[];
}
