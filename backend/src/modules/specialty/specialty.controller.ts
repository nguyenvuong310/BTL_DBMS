import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Specialty')
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialtyService.findOne(+id);
  }
}
