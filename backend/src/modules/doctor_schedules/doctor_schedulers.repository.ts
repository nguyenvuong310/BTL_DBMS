import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { DoctorSchedule } from './entities/doctor_schedule.entity';

import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';

@Injectable()
export class DoctorSchedulerRepository {
  constructor(@InjectRepository(DoctorSchedule) private doctorSchedulerRepository: Repository<DoctorSchedule>) {}

  async getDoctorSchedulesByDoctorId(doctor_id: string): Promise<DoctorSchedule[]> {
    return this.doctorSchedulerRepository.find({ where: { doctor: { id: doctor_id } } });
  }

  async save(doctorSchedule: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
    return this.doctorSchedulerRepository.save(doctorSchedule);
  }

  async update(id: string, doctorSchedule: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
    return this.doctorSchedulerRepository.save({ ...doctorSchedule, id });
  }

  async remove(id: string): Promise<void> {
    await this.doctorSchedulerRepository.delete(id);
  }
}
