import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Specialty')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Retrieve a list of all specialties' })
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', required: true, example: '089bfce0-0867-4e55-beb0-be0498fa5636' })
  @ApiOperation({ summary: 'Retrieve a specialty by id' })
  findOne(@Param('id') id: string) {
    return this.specialtyService.findById(id);
  }
}
