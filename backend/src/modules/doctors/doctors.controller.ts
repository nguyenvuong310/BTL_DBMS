import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from '../prescription/dto/create-prescription.dto';
import { PrescriptionService } from '../prescription/prescription.service';

import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(
    @Inject(DoctorsService)
    private readonly doctorsService: DoctorsService,

    @Inject(PrescriptionService)
    private readonly prescriptionService: PrescriptionService,
  ) {}

  @Get('/feedbacks')
  async getFeedbacksByDoctorId(@User() user: UserDto) {
    console.log(user);
    return this.doctorsService.getFeedbacksByDoctorId(user.id);
  }

  @Post('/prescribe')
  async prescribe(
    @Body() createPrescriptionDto: CreatePrescriptionDto, // Receive the prescription data from the request body
  ) {
    // Call the service to create prescription items for the appointment
    return this.prescriptionService.createPrescription(createPrescriptionDto);
  }

  @Post('/schedule')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return 'sdjsj';
  }
}
