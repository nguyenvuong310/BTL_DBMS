import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserDto } from 'src/modules/users/dto/user.dto';

export class UserProfileDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  accessToken: string;

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;

  constructor(accessToken: string, user: UserDto) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
