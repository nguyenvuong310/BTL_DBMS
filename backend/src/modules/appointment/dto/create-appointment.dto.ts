import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @ApiProperty({ example: 'Đau họng' })
  reason: string;

  @IsUUID()
  @ApiProperty({ example: '4575eead-b936-4664-afdc-6ed7b5dba8af' })
  scheduleId: string;
}
