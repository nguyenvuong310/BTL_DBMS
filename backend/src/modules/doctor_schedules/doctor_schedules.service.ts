import { Injectable } from '@nestjs/common';
import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor_schedule.dto';

@Injectable()
export class DoctorSchedulesService {
  create(createDoctorScheduleDto: CreateDoctorScheduleDto) {
    return 'This action adds a new doctorSchedule';
  }

  findAll() {
    return `This action returns all doctorSchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorSchedule`;
  }

  update(id: number, updateDoctorScheduleDto: UpdateDoctorScheduleDto) {
    return `This action updates a #${id} doctorSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorSchedule`;
  }
}
