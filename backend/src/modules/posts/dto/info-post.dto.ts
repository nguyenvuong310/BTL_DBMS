import { OmitType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class InfoPostDto extends CreatePostDto {
  id: number;
}
