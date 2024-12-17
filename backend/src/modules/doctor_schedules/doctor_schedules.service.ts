import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor_schedule.dto';
import { DoctorSchedulerRepository } from './doctor_schedulers.repository';
import { InfoDoctorScheduleDto } from './dto/info-doctor_schedule.dto';
import { DayDto } from './dto/day.dto';
import { ScheduleInfo } from './dto/schedule_infor.dto';

@Injectable()
export class DoctorSchedulesService {
  constructor(
    @Inject(DoctorSchedulerRepository)
    private doctorSchedulesRepository: DoctorSchedulerRepository,
  ) {}

  async create(createDoctorScheduleDto: CreateDoctorScheduleDto, userId: string): Promise<InfoDoctorScheduleDto> {
    try {
      const overlapSchedules = await this.doctorSchedulesRepository.isTimeSlotAvailable(
        userId,
        createDoctorScheduleDto.day,
        createDoctorScheduleDto.start_time,
        createDoctorScheduleDto.end_time,
      );

      if (!overlapSchedules) {
        throw new HttpException(
          'Lịch bị xung đột, vui lòng kiểm tra lại lịch của bạn',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const schedule = await this.doctorSchedulesRepository.save(createDoctorScheduleDto, userId);
      return new InfoDoctorScheduleDto(schedule);
    } catch (error) {
      throw error;
    }
  }

  async findAllByDoctorId(userId: string): Promise<InfoDoctorScheduleDto[]> {
    const schedules = await this.doctorSchedulesRepository.getDoctorSchedulesByDoctorId(userId);
    return schedules.map((schedule) => new InfoDoctorScheduleDto(schedule));
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

  async getDoctorSchedulesByDoctorId(doctor_id: string): Promise<ScheduleInfo[]> {
    const schedules = await this.doctorSchedulesRepository.getDoctorSchedulesByDoctorId(doctor_id);

    return schedules.map((schedule) => new ScheduleInfo(schedule));
  }

  async findDoctorScheduleByDoctorIdAndDay(doctorId: string, day: Date) {
    const schedules = await this.doctorSchedulesRepository.getDoctorScheduleByDoctorIdAndDay(doctorId, day);
    return schedules.map((schedule) => new InfoDoctorScheduleDto(schedule));
  }

  async findDoctorScheduleNow(doctorId: string) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);
    const schedules = await this.doctorSchedulesRepository.getDoctorSchedulesNow(doctorId, now, next7Days);
    return schedules.map((schedule) => new DayDto(schedule.schedule_day));
  }
}
