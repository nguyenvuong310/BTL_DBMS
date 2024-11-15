import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateHealthInsuranceDto } from '../health_insurance/dto/create-health_insurance.dto';
import { UpdateHealthInsuranceDto } from '../health_insurance/dto/update-health_insurance.dto';
import { CreateFeedbackDto } from '../feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('feedback')
  async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.patientsService.createFeedback(createFeedbackDto);
  }

  @Patch('feedback/:id')
  async updateFeedback(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.patientsService.updateFeedback(id, updateFeedbackDto);
  }

  @Delete('feedback/:id')
  async removeFeedback(@Param('id') id: string) {
    return this.patientsService.removeFeedback(id);
  }

  @Get('prescription')
  async prescriptionByUserId(@Param('user_id') user_id: string, @Param('appointment_id') appointment_id: string) {
    return this.patientsService.viewPrescriptions(appointment_id);
  }

  @Get('prescription/:id')
  async prescriptionById(@Param('id') prescription_id: string) {
    return 'jdjksjk';
  }
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
