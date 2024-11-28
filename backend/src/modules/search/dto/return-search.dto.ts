import { Type } from 'class-transformer';
import { InfoDoctorDto } from '../../../modules/doctors/dto/info-doctor.dto';
import { InfoHospitalDto } from '../../../modules/hospitals/dto/info-hospital.dto';
import { InfoSpecialtyDto } from '../../../modules/specialty/dto/info-specialty.dto';
import { ValidateNested } from 'class-validator';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';

export class ReturnSearchDto {
  @Type(() => InfoDoctorDto)
  @ValidateNested({ each: true })
  doctors?: InfoDoctorDto[];

  @Type(() => InfoHospitalDto)
  @ValidateNested({ each: true })
  hospitals?: InfoHospitalDto[];

  @Type(() => InfoSpecialtyDto)
  @ValidateNested({ each: true })
  specialties?: InfoSpecialtyDto[];

  constructor(doctors?: InfoDoctorDto[], hospitals?: InfoHospitalDto[], specialties?: InfoSpecialtyDto[]) {
    this.doctors = doctors || [];
    this.hospitals = hospitals || [];
    this.specialties = specialties || [];
  }
}
