import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from '../prescription/dto/create-prescription.dto';
import { PrescriptionService } from '../prescription/prescription.service';

import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(
    @Inject(DoctorsService)
    private readonly doctorsService: DoctorsService,

    @Inject(PrescriptionService)
    private readonly prescriptionService: PrescriptionService,
  ) {}

  // @Get('/feedbacks')
  // async getFeedbacksByDoctorId(@User() user: UserDto) {
  //   console.log(user);
  //   return this.doctorsService.getFeedbacksByDoctorId(user.id);
  // }

  // @Post('/prescribe')
  // async prescribe(
  //   @Body() createPrescriptionDto: CreatePrescriptionDto, // Receive the prescription data from the request body
  // ) {
  //   // Call the service to create prescription items for the appointment
  //   return this.prescriptionService.createPrescription(createPrescriptionDto);
  // }

  @Get('/popular')
  @Public()
  @ApiOperation({ summary: 'Get popular doctors' })
  async getPopularDoctors() {
    return this.doctorsService.getPopularDoctor();
  }

  @Get('/specialty/:specialty_id')
  @Public()
  @ApiOperation({ summary: 'Get doctors by specialty' })
  findAllBelongsToSpecialty(@Param('specialty_id') specialty_id: string) {
    return this.doctorsService.getDoctorBySpecialty(specialty_id);
  }

  @Get('/hospital/:hospital_id')
  @Public()
  @ApiOperation({ summary: 'Get doctors by hospital' })
  findAllBelongsToHospital(@Param('hospital_id') hospital_id: string) {
    return this.doctorsService.getDoctorByHospital(hospital_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'find one';
  }
}
