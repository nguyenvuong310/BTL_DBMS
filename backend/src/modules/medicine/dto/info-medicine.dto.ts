import { ApiProperty } from '@nestjs/swagger';

export class InfoMedicineDto {
  @ApiProperty({ example: 'acfa91cf-a332-11ef-a2a3-0242ac140003' })
  id: string;

  @ApiProperty({ example: 'Paracetamol' })
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
