import { IsString, ValidateNested } from 'class-validator';
import { CreatePrescriptionItemDto } from '../../../modules/prescription_items/dto/create-prescription_item.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {
  @IsString()
  @ApiProperty({ example: '000aae48-9377-4e0d-b45b-69c2b7354178' })
  appointmentId: string;

  @Type(() => CreatePrescriptionItemDto)
  @ValidateNested({ each: true })
  prescriptionItems: CreatePrescriptionItemDto[];
}
