import { TimePeriod } from 'src/constants/action.enum';

export class CreatePrescriptionItemDto {
  medicineId: string;

  dosage: string;

  status: TimePeriod;
}
