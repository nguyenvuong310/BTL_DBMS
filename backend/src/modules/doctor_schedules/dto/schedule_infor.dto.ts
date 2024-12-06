import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { DoctorSchedule } from '../entities/doctor_schedule.entity';

export class ScheduleInfo {
  @ApiProperty({ example: 'MRI Registration' })
  title: string;

  @ApiProperty({ example: '2024-12-18T09:00:00' })
  start: string;

  @ApiProperty({ example: '2024-12-18T10:00:00' })
  end: string;

  constructor(schedule: DoctorSchedule) {
    this.title = 'Khám bệnh';
    const date = new Date(schedule.day);
    const formattedDate = date.toISOString().split('T')[0];

    this.start = formattedDate + 'T' + schedule?.start_time + ':00';
    this.end = formattedDate + 'T' + schedule?.end_time + ':00';
  }
}
