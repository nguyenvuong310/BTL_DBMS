import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from '../entities/reply.entity';

@Injectable()
export class ReplyRepository {
  constructor(@InjectRepository(Reply) private postRepository: Repository<Reply>) {}
}
