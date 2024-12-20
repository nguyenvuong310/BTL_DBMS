import { Injectable, Inject } from '@nestjs/common';
import { Between, LessThan, MoreThan, Not, Repository } from 'typeorm';

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

  async getDoctorScheduleByDoctorIdAndDay(doctorId: string, day: Date): Promise<DoctorSchedule[]> {
    return this.doctorSchedulerRepository.find({
      where: { doctor: { id: doctorId }, day },
      order: { start_time: 'ASC' },
    });
  }
  async getDoctorSchedulesNow(doctorId: string, today: Date, next7Days: Date): Promise<any> {
    return this.doctorSchedulerRepository
      .createQueryBuilder('schedule')
      .select(['schedule.day'])
      .where('schedule.doctorId = :doctorId', { doctorId })
      .andWhere('schedule.day BETWEEN :today AND :next7Days', { today, next7Days })
      .groupBy('schedule.day')
      .orderBy('schedule.day', 'ASC')
      .getRawMany();
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

  async findById(id: string): Promise<DoctorSchedule> {
    return this.doctorSchedulerRepository.findOne({
      where: { id },
    });
  }
}
