import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all search by type' })
  findAllByType(@Query() query: FindAllQueryDto) {
    return this.searchService.findAllByType(query?.type, query?.search);
  }
}
