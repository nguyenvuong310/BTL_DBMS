import { Inject, Injectable } from '@nestjs/common';
import { ActionRepository } from './responsibilities/action.reposibility';
import { Action } from './entities/action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class ActionsService {
  constructor(
    @Inject(ActionRepository)
    private readonly ActionRepository: ActionRepository,

    @Inject(UsersService)
    private readonly usersService: UsersService,

    @Inject(PostsService)
    private readonly postsService: PostsService,
  ) {}

  async create(action: CreateActionDto): Promise<Action> {
    const user = await this.usersService.findOne(action.userId);
    const post = await this.postsService.findOne(action.postId);

    return this.ActionRepository.create(user, post);
  }
}
