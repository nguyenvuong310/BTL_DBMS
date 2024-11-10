import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post);
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }
}
