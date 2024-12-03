import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusType } from 'src/constants/action.enum';

export class UpdateAppointmentDto {
  @ApiProperty({ enum: StatusType })
  @IsEnum(StatusType)
  status: StatusType;

  @ApiProperty()
  reason_cancel?: string;
}
