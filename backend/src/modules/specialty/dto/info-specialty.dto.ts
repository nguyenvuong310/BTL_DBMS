import { ApiProperty } from '@nestjs/swagger';
import { Specialty } from '../entities/specialty.entity';

export class InfoSpecialtyDto {
  @ApiProperty({ example: '089bfce0-0867-4e55-beb0-be0498fa5636' })
  id: string;

  @ApiProperty({ example: 'Ngoại thần kinh' })
  name: string;

  @ApiProperty({ example: 'https://cdn.bookingcare.vn/fo/2023/12/26/101655-ngoai-than-kinh.png' })
  logo: string;

  doctorsDescription: string[];

  symptomDescriptions: string[];

  constructor(specialty: Specialty) {
    this.id = specialty.id;
    this.name = specialty.name;
    this.logo = specialty.logo;
    const description = JSON.parse(specialty?.description);
    this.doctorsDescription = description?.doctorDescription;
    this.symptomDescriptions = description?.symptomDescription;
  }
}
