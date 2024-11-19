import { ApiProperty } from '@nestjs/swagger';
import { Hospital } from '../../../modules/hospitals/entities/hospital.entity';
import { Specialty } from '../../../modules/specialty/entities/specialty.entity';
import { Doctor } from '../entities/doctor.entity';
import { Type } from 'class-transformer';

export class HospitalDto {
  @ApiProperty({ example: '45f2deb0-203a-4493-9769-635360918947' })
  id: string;

  @ApiProperty({ example: 'Endo Clinic - Tiêu Hoá Khoẻ & Ngừa Ung Thư' })
  name: string;
}

export class SpecialtyDto {
  @ApiProperty({ example: 'a042f641-5936-4646-a45c-9e43d8b8ee72' })
  id: string;

  @ApiProperty({ example: 'Chuyên khoa Mắt' })
  name: string;
}

export class InfoDoctorDto {
  @ApiProperty({ example: '45f2deb0-203a-4493-9769-635360918947' })
  id: string;

  @ApiProperty({ example: 'Bác sĩ Chuyên khoa I Nguyễn Thị Thúy Nga' })
  name: string;

  @ApiProperty({ example: 'doctor1@gmail.com' })
  email: string;

  @ApiProperty({
    example:
      'Gần 20 năm kinh nghiệm trong khám và điều trị các bệnh lý về mắt<br />\nPhó Trưởng khoa Khúc xạ Bệnh viện Mắt Hà Nội 2<br />\nBác sĩ chuyên khám và Phẫu thuật, điều trị & kiểm soát tật khúc xạ',
  })
  bio: string;

  @ApiProperty({ example: 'https://cdn.bookingcare.vn/fo/w256/2023/04/03/165611-4-bscki-nguyen-thi-thuy-nga.jpg' })
  avatar: string;

  @ApiProperty({ example: 300000 })
  examinationPrice: number;

  @ApiProperty({ example: 0 })
  rating: number;

  @ApiProperty({
    type: HospitalDto, // Specify the type of the hospital field
  })
  hospital: HospitalDto;

  @ApiProperty({
    type: SpecialtyDto, // Specify the type of the specialty field
  })
  specialty: SpecialtyDto;

  constructor(doctor: Doctor) {
    this.id = doctor?.id;
    this.name = doctor?.name;
    this.email = doctor?.email;
    this.bio = doctor?.bio;
    this.avatar = doctor?.avatar;
    this.examinationPrice = doctor?.examinationPrice;
    this.rating = doctor?.rating;
    this.hospital = {
      id: doctor?.hospital?.id,
      name: doctor?.hospital?.name,
    };
    this.specialty = {
      id: doctor?.specialty?.id,
      name: doctor?.specialty?.name,
    };
  }
}
