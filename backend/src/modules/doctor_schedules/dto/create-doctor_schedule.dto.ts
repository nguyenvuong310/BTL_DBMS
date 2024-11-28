import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Validate } from 'class-validator';
import { IsTimeRangeValid } from '../../../decorator/IsTimeRangeValid.decorator';

@IsTimeRangeValid({ message: 'Start time must be earlier than end time and within valid ranges (00:00 to 23:59).' })
export class CreateDoctorScheduleDto {
  @IsDate()
  @Transform(({ value }) => {
    // Ensure the value is a valid Date and strip the time part
    const date = new Date(value);
    if (isNaN(date.getTime())) return null; // Handle invalid date
    return new Date(date.toISOString().split('T')[0]); // Return only the date part
  })
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
