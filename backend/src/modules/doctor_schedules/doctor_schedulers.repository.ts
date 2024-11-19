import { Injectable, Inject } from '@nestjs/common';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { DoctorSchedule } from './entities/doctor_schedule.entity';

import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';

@Injectable()
export class DoctorSchedulerRepository {
  constructor(@InjectRepository(DoctorSchedule) private doctorSchedulerRepository: Repository<DoctorSchedule>) {}

  async getDoctorSchedulesByDoctorId(doctor_id: string): Promise<DoctorSchedule[]> {
    return this.doctorSchedulerRepository.find({ where: { doctor: { id: doctor_id } } });
  }

  async save(doctorSchedule: CreateDoctorScheduleDto, userId: string): Promise<DoctorSchedule> {
    return this.doctorSchedulerRepository.save({
      ...doctorSchedule,
      doctor: { id: userId },
    });
  }

  async update(id: string, doctorSchedule: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
    return this.doctorSchedulerRepository.save({ ...doctorSchedule, id });
  }

  async remove(id: string): Promise<void> {
    await this.doctorSchedulerRepository.delete(id);
  }

  async isTimeSlotAvailable(doctorId: string, day: Date, start_time: string, end_time: string): Promise<boolean> {
    const dayString = day.toISOString().split('T')[0];

    const overlappingSchedules = await this.doctorSchedulerRepository
      .createQueryBuilder('doctor_schedules')
      .where('doctor_schedules.doctorId = :doctorId', { doctorId })
      .andWhere('DATE(doctor_schedules.day) = :day', { day: dayString })
      .andWhere('(doctor_schedules.start_time < :endTime AND doctor_schedules.end_time > :startTime)', {
        startTime: start_time,
        endTime: end_time,
      })
      .getMany();

    return overlappingSchedules.length === 0;
  }
}
