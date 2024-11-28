import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';

import { UserProfileDto } from './dto/user-profile';

import { InfoUserDto } from '../users/dto/info-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByEmail(username);
    if (user && this.usersService.isValidPassword(pass, user.user.password)) {
      // console.log(user);
      return {
        id: user.user.id,
        name: user.user.name,
        email: user.user.email,
        role: user.role,
      };
    }
    return null;
  }

  async login(user: any, response: Response): Promise<UserProfileDto> {
    const { id, email, name, role } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id,
      email,
      name,
      role,
    };
    const refreshToken = this.createRefreshToken(payload);

    await this.usersService.updateRefreshToken(user.id, refreshToken, role);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
    });

    return new UserProfileDto(this.jwtService.sign(payload), user);
  }

  // async register(user: CreateUserDto) {
  //   try {
  //     return await this.usersService.create(user);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
    });
    return refreshToken;
  };

  /*
  parse token to get role user
  add role to payload to create new access token
  update refresh token in database based user role
  
  */
  async provideNewAccessToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.usersService.findUserByRefreshToken(refreshToken);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }
      const { id, email, name } = user.user;
      const role = user.role;

      const payload = {
        sub: 'token refresh',
        iss: 'from server',
        id,
        name,
        email,
        role,
      };
      const newRefreshToken = this.createRefreshToken(payload);

      await this.usersService.updateRefreshToken(id, newRefreshToken, role);

      response.clearCookie('refreshToken');
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
      });

      return new UserProfileDto(this.jwtService.sign(payload), {
        id,
        email,
        name,
        role,
      });
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  /* Base on role user to update table*/
  async logout(response: Response, user: InfoUserDto) {
    await this.usersService.updateRefreshToken(user.user.id, '', user.role);
    response.clearCookie('refreshToken');
    return 'Logout successfully';
  }
}
