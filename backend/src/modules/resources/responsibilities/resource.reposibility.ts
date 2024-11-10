import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from '../entities/resource.entity';

@Injectable()
export class ResourceRepository {
  constructor(@InjectRepository(Resource) private postRepository: Repository<Resource>) {}
}
