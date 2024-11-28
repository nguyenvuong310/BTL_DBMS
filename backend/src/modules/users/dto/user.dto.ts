import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'acfa91cf-a332-11ef-a2a3-0242ac140003' })
  id: string;

  @ApiProperty({ example: 'trungvuong@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Trung Vuong' })
  name: string;

  @ApiProperty({ example: 'PATIENT' })
  role: string;

  constructor(id: string, email: string, name: string, role: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
