import { Controller } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('replies')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}
}
