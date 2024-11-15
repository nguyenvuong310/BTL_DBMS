import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { InfoHospitalDto } from './dto/info-hospital.dto';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Retrieve a list of all hospitals' })
  findAll(): Promise<InfoHospitalDto[]> {
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Retrieve a hospital by id' })
  findOne(@Param('id') id: string): Promise<InfoHospitalDto> {
    return this.hospitalsService.findById(id);
  }
}
