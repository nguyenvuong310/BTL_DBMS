import { Inject, Injectable } from '@nestjs/common';
import { ReplyRepository } from './responsibilities/reply.reposibility';

@Injectable()
export class ReplysService {
  constructor(
    @Inject(ReplyRepository)
    private readonly ReplyRepository: ReplyRepository,
  ) {}
}
