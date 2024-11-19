import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Validate } from 'class-validator';
import { IsTimeRangeValid } from '../../../decorator/IsTimeRangeValid.decorator';

@IsTimeRangeValid({ message: 'timeStart must be earlier than timeEnd' })
export class CreateDoctorScheduleDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  day: Date;

  @IsString()
  @Transform(({ value }) => value.slice(0, 5))
  @ApiProperty({ example: '08:00' })
  start_time: string;

  @IsString()
  @Transform(({ value }) => value.slice(0, 5))
  @ApiProperty({ example: '09:00' })
  end_time: string;

  @IsNumber()
  @ApiProperty({ example: 10 })
  max_slots: number;
}
