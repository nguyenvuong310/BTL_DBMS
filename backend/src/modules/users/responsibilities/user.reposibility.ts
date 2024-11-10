import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUserName(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: Like(`%${username}%`), // Using LIKE for partial matching
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return await this.userRepository.update(userId, { refreshToken });
  }

  async findByRefreshToken(refreshToken: string) {
    return await this.userRepository.findOne({ where: { refreshToken } });
  }
}
