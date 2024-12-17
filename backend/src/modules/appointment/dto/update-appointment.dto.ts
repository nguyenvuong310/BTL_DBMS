import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { StatusType } from 'src/constants/action.enum';

export class UpdateAppointmentDto {
  @ApiProperty({ enum: StatusType })
  @IsEnum(StatusType)
  status: StatusType;

  @ApiProperty()
  @IsString()
  reason_cancel?: string;
}
