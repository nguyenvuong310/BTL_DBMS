import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';

import { StatusType } from '../../constants/action.enum';

@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiBody({ type: CreateAppointmentDto })
  @ApiOperation({ summary: 'Create appointment by patient for doctor' })
  create(@Body() createAppointmentDto: CreateAppointmentDto, @User() user: UserDto) {
    return this.appointmentService.create(createAppointmentDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments by user id' })
  @ApiQuery({ name: 'current', description: 'Current page number', required: true, example: 1 })
  @ApiQuery({ name: 'pageSize', description: 'Number of items per page', required: false, example: 10 })
  @ApiQuery({
    name: 'sort',
    description:
      'Sorting criteria as a JSON string' +
      ' - Valid fields: doctorName, date, time, hospitalName, createdAt. Valid orders: ASC, DESC.',
    required: false,
    example: '{"doctorName":"ASC","date":"ASC","time":"ASC","hospitalName":"ASC"}',
  })
  @ApiQuery({
    name: 'filter',
    description: 'Filter field only status',
    required: false,
    enum: StatusType,
  })
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string = '10',
    @Query('sort') sort: string,
    @Query('filter') filter: StatusType | null,
    @User() user: UserDto,
  ) {
    return this.appointmentService.findAll(currentPage, limit, sort, filter, user.id);
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
