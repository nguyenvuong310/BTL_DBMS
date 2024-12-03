import { IsString } from 'class-validator';

export class InfoPrescriptionItemsDto {
  @IsString()
  medicine_name: string;

  @IsString()
  dosage: string;
}
