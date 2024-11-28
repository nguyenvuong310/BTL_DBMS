import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { use } from 'passport';

@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiBody({ type: CreateAppointmentDto })
  @ApiOperation({ summary: 'Create appointment by patient for doctor' })
  create(@Body() createAppointmentDto: CreateAppointmentDto, @User() user: UserDto) {
    return this.appointmentService.create(createAppointmentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments by user id' })
  findAll() {
    return 'this.appointmentService.findAll()';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'this.appointmentService.findOne(+id)';
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update appointment by patient or doctor' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return 'this.appointmentService.update(+id, updateAppointmentDto)';
  }
}
