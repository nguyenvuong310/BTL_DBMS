import { ApiProperty } from '@nestjs/swagger';
import { DoctorSchedule } from '../entities/doctor_schedule.entity';

export class InfoDoctorScheduleDto {
  @ApiProperty({ example: '37ccd0bd-4b61-48ba-adf3-70a9b9647e64' })
  id: string;

  @ApiProperty({ example: '03ba63f1-9278-4944-b45a-1403f6259d9b' })
  doctor_id: string;

  @ApiProperty({ example: '2024-11-19T12:46:10.861Z' })
  day: Date;

  @ApiProperty({ example: '18:30' })
  start_time: string;

  @ApiProperty({ example: '19:00' })
  end_time: string;

  @ApiProperty({ example: 10 })
  max_slots: number;

  constructor(doctorSchedule: DoctorSchedule) {
    this.id = doctorSchedule?.id;
    this.doctor_id = doctorSchedule?.doctor?.id;
    this.day = doctorSchedule?.day;
    this.start_time = doctorSchedule?.start_time;
    this.end_time = doctorSchedule?.end_time;
    this.max_slots = doctorSchedule.max_slots;
  }
}
