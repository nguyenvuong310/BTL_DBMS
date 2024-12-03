import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { Public } from 'src/decorator/public.decorator';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService, @InjectRedis() private readonly redis: Redis) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all search by type' })
  findAllByType(@Query() query: FindAllQueryDto) {
    return this.searchService.findAllByType(query?.type, query?.search);
  }

  @Get('/hello')
  @Public()
  async getHello() {
    await this.redis.set('key', 'Redis dat!');
    const redisData = await this.redis.get('key');
    return { redisData };
  }
}
