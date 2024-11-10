import { Controller, Get, Post, UseGuards, Req, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from 'src/decorator/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseMessage } from '../../decorator/responseMessage.decorator';
import { Response, Request } from 'express';

import { User } from '../../decorator/user.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

import { UserProfileDto } from './dto/user-profile';

import { InfoUserDto } from '../users/dto/info-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ResponseMessage('User Login')
  @UseGuards(LocalAuthGuard)
  async hanldeLogin(@Req() req: Request, @Res({ passthrough: true }) response: Response): Promise<UserProfileDto> {
    const user = await this.authService.login(req.user, response);
    return user;
  }

  @Post('register')
  @Public()
  @ResponseMessage('Register a new user')
  async register(@Body() user: CreateUserDto): Promise<InfoUserDto> {
    return this.authService.register(user);
  }

  // @Get('account')
  // @ApiOperation({ summary: 'Get user account by access token' })
  // @ResponseMessage('Get user account')
  // async getAccount(@User() user: IUser): Promise<IUser> {
  //   const role = await this.rolesService.findOne(user.role._id);
  //   const permissions = (role?.permissions as unknown as PermissionDto[]) ?? ([] as PermissionDto[]);
  //   const objUser: IUser = {
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //     permissions,
  //   };

  //   return objUser;
  // }

  @Get('refresh')
  @Public()
  @ApiOperation({ summary: 'Refresh access token by refresh token' })
  @ResponseMessage('Refresh access token')
  handleRefreshToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.provideNewAccessToken(refreshToken, response);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ResponseMessage('Logout')
  @ApiResponse({ status: 200, description: 'Logout successfully' })
  logout(@Res({ passthrough: true }) response: Response, @User() user: InfoUserDto): Promise<string> {
    return this.authService.logout(response, user);
  }
}
