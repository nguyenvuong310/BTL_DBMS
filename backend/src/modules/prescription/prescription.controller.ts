import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../constants/action.enum';
import { AuthorRole } from '../../decorator/author-role.decorator';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../../decorator/user.decorator';

@ApiTags('Prescription')
@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @AuthorRole(Role.DOCTOR)
  @ApiOperation({ summary: 'Create prescription by doctor for patient in appointment' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto, @User() user: UserDto) {
    return this.prescriptionService.create(createPrescriptionDto, user.id);
  }

  @Get(':appointmentId')
  @ApiOperation({ summary: 'Get prescription by appointment id' })
  findOne(@Param('appointmentId') id: string, @User() user: UserDto) {
    return this.prescriptionService.findPrescription(id, user);
  }
}
