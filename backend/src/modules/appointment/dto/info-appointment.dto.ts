import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../entities/appointment.entity';

export class InfoAppointmentDto {
  @ApiProperty({ example: 'Nguyễn Văn A' })
  patientName: string;
  @ApiProperty({ example: 'Tiến sĩ, Bác sĩ Vũ Hải' })
  doctorName: string;
  @ApiProperty({ example: '01/01/2021' })
  date: string;
  @ApiProperty({ example: '08:00 - 09:00' })
  time: string;
  @ApiProperty({ example: 'Đau họng' })
  reason: string;
  @ApiProperty({ example: 'Bệnh viện Bạch Mai' })
  hospitalName: string;
  @ApiProperty({ example: '78 Đường Giải Phóng, Thanh Xuân, Hà Nội' })
  address: string;

  constructor(appointment: Appointment) {
    this.patientName = appointment.patient.name;
    this.doctorName = appointment.doctor_schedule.doctor.name;

    const date = new Date(appointment.doctor_schedule.day);
    this.date = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}/${date.getFullYear()}`;
    this.time = appointment.doctor_schedule.start_time + ' - ' + appointment.doctor_schedule.end_time;
    this.reason = appointment.reason;
    this.hospitalName = appointment.doctor_schedule.doctor.hospital.name;
    this.address = appointment.doctor_schedule.doctor.hospital.address;
  }
}
