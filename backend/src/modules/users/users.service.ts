import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './responsibilities/user.reposibility';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  hashPassword(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(user: CreateUserDto): Promise<User> {
    user.password = this.hashPassword(user.password);
    return this.userRepository.create(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return await this.userRepository.updateRefreshToken(userId, refreshToken);
  }

  async findUserByRefreshToken(refreshToken: string) {
    return await this.userRepository.findByRefreshToken(refreshToken);
  }
}
