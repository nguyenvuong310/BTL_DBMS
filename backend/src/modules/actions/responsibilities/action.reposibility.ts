import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Action } from '../entities/action.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActionRepository {
  constructor(@InjectRepository(Action) private ActionRepository: Repository<Action>) {}

  async findAll(): Promise<Action[]> {
    return this.ActionRepository.find();
  }

  async create(user: any, post: any): Promise<Action> {
    return this.ActionRepository.save({ user, post });
  }

  async delete(id: number): Promise<void> {
    await this.ActionRepository.delete(id);
  }
}
