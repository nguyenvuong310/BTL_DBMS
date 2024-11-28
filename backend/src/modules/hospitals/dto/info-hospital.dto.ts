import { ApiProperty } from '@nestjs/swagger';
import { Hospital } from '../entities/hospital.entity';

export class InfoHospitalDto {
  @ApiProperty({ example: '016d55d7-db2e-4107-b96b-76af2ccb5c89' })
  id: string;

  @ApiProperty({ example: 'Bệnh viện Lão khoa Trung ương' })
  name: string;

  @ApiProperty({ example: 'Số 29, Đường Nguyễn Trãi, Thanh Xuân, Hà Nội' })
  address: string;

  @ApiProperty({ example: 'https://cdn.bookingcare.vn/fo/2018/07/02/175558benh-vien-lao-khoa-lo-go-1.jpeg' })
  logo: string;

  @ApiProperty({ example: '2024-11-14T08:57:51.616Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-11-14T08:57:51.616Z' })
  updatedAt: Date;

  constructor(hospital: Hospital) {
    this.id = hospital.id;
    this.name = hospital.name;
    this.address = hospital.address;
    this.logo = hospital.logo;
    this.createdAt = hospital.createdAt;
    this.updatedAt = hospital.updatedAt;
  }
}
