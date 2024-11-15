import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Retrieve a specialty by id' })
  findOne(@Param('id') id: string) {
    return this.specialtyService.findById(id);
  }
}
