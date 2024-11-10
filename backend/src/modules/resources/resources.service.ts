import { Inject, Injectable } from '@nestjs/common';
import { ResourceRepository } from './responsibilities/resource.reposibility';

@Injectable()
export class ResourcesService {
  constructor(
    @Inject(ResourceRepository)
    private readonly resourceRepository: ResourceRepository,
  ) {}
}
