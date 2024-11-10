import { Controller } from '@nestjs/common';
import { ReplysService } from './replies.service';

@Controller('replies')
export class ReplysController {
  constructor(private readonly replysService: ReplysService) {}
}
