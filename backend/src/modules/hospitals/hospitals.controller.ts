import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  findAll() {
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalsService.findOne(+id);
  }
}
