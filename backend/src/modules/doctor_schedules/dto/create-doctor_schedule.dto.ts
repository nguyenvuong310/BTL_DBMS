import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDoctorScheduleDto {
  @IsDate()
  @Transform(({ value }) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-GB'); // Converts date to dd/mm/yyyy
  })
  day: string;

  @IsString()
  @Transform(({ value }) => value.slice(0, 5)) // Ensures the time is formatted as HH:mm
  time: string;

  @IsNumber()
  max_slots: number;
}
