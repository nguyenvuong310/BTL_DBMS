import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { InfoPrescriptionItemsDto } from 'src/modules/prescription_items/dto/info-prescription_items.dto';

export class InfoPrescriptionDto {
  @Type(() => InfoPrescriptionItemsDto)
  @ValidateNested({ each: true })
  morning: InfoPrescriptionItemsDto[];

  @Type(() => InfoPrescriptionItemsDto)
  @ValidateNested({ each: true })
  afternoon: InfoPrescriptionItemsDto[];

  @Type(() => InfoPrescriptionItemsDto)
  @ValidateNested({ each: true })
  evening: InfoPrescriptionItemsDto[];
}
