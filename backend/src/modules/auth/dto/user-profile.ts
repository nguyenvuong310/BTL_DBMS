import { ApiProperty } from '@nestjs/swagger';
import { InfoUserDto } from 'src/modules/users/dto/info-user.dto';

export class UserProfileDto {
  accessToken: string;

  user: InfoUserDto;

  constructor(accessToken: string, user: InfoUserDto) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
