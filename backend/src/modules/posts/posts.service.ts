import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from './responsibilities/post.reposibility';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(PostRepository)
    private readonly PostRepository: PostRepository,
  ) {}

  async create(Post: CreatePostDto): Promise<Post> {
    return this.PostRepository.create(Post);
  }

  async findOne(id: number): Promise<Post> {
    return this.PostRepository.findOne(id);
  }
}
