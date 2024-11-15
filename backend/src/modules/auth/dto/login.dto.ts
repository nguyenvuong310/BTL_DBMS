import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'trungvuong@gmail.com' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '0310' })
  password: string;
}
