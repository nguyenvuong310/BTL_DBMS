import { IsEnum, IsOptional } from 'class-validator';
import { SearchType } from '../../../constants/action.enum';

export class FindAllQueryDto {
  @IsOptional()
  @IsEnum(SearchType, { message: 'type must be USERS, POSTS, or COMMENTS' })
  type?: SearchType;

  @IsOptional()
  search?: string;
}
