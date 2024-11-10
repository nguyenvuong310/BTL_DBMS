import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import ms from 'ms';

import { UserProfileDto } from './dto/user-profile';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InfoUserDto } from '../users/dto/info-user.dto';
import { first, last } from 'rxjs';

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
    if (user && this.usersService.isValidPassword(pass, user.password)) {
      console.log(user);
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }
    return null;
  }

  async login(user: any, response: Response): Promise<UserProfileDto> {
    const { username, id, email, firstName, lastName } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id,
      username,
      email,
      firstName,
      lastName,
    };
    const refreshToken = this.createRefreshToken(payload);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
    });

    return new UserProfileDto(this.jwtService.sign(payload), user);
  }

  async register(user: CreateUserDto) {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  createRefreshToken = (payload) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
    });
    return refreshToken;
  };

  async provideNewAccessToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.usersService.findUserByRefreshToken(refreshToken);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }
      const { username, id, email, firstName, lastName } = user;

      const payload = {
        sub: 'token refresh',
        iss: 'from server',
        id,
        username,
        email,
        firstName,
        lastName,
      };
      const newRefreshToken = this.createRefreshToken(payload);

      await this.usersService.updateRefreshToken(user.id, newRefreshToken);

      const newUser = await this.usersService.findOne(user.id);
      response.clearCookie('refreshToken');
      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
      });

      return new UserProfileDto(this.jwtService.sign(payload), newUser);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async logout(response: Response, user: InfoUserDto) {
    await this.usersService.updateRefreshToken(user.id, '');
    response.clearCookie('refreshToken');
    return 'Logout successfully';
  }
}
