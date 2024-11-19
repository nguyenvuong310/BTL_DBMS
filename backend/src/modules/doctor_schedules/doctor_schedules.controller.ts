import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor_schedules.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor_schedule.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';

@ApiTags('DoctorSchedules')
@Controller('doctor-schedules')
export class DoctorSchedulesController {
  constructor(private readonly doctorSchedulesService: DoctorSchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create doctor schedule only role doctor' })
  create(@Body() createDoctorScheduleDto: CreateDoctorScheduleDto, @User() user: UserDto) {
    try {
      return this.doctorSchedulesService.create(createDoctorScheduleDto, user?.id);
    } catch (error) {
      throw new HttpException('An error occurred while creating the schedule.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get('/within-7-days/:doctorId')
  // @ApiOperation({ summary: 'Get doctor schedules within 7 day role patient' })
  // findWithin7Days(@Param('doctorId') doctorId: string) {
  //   return this.doctorSchedulesService.findAll();
  // }

  @Get()
  @ApiOperation({ summary: 'Get all my doctor schedules belongs to doctor' })
  findAll(@User() user: UserDto) {
    return this.doctorSchedulesService.getDoctorSchedulesByDoctorId(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorSchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorScheduleDto: UpdateDoctorScheduleDto) {
    return this.doctorSchedulesService.update(+id, updateDoctorScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorSchedulesService.remove(+id);
  }
}
