import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor_schedules.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor_schedule.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserDto } from '../users/dto/user.dto';
import { Public } from 'src/decorator/public.decorator';

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

  @Get(':doctorId')
  @Public()
  @ApiOperation({ summary: 'Get doctor schedule by doctor id' })
  @ApiParam({ name: 'doctorId', required: true, example: '0164bb7f-5c24-49b2-95b3-1c51c8e7ab3c' })
  @ApiQuery({ name: 'day', required: false, example: '2024-11-28 00:00:00' })
  findOne(@Param('doctorId') id: string, @Query('day') day: string) {
    const normalizedDay = new Date(day.split('T')[0]);
    return this.doctorSchedulesService.findDoctorScheduleByDoctorIdAndDay(id, normalizedDay);
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
