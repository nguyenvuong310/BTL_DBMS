import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@gmail.com' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}
