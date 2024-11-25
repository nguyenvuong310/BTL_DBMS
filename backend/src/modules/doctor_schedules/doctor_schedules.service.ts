import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDoctorScheduleDto } from './dto/create-doctor_schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor_schedule.dto';
import { DoctorSchedulerRepository } from './doctor_schedulers.repository';
import { InfoDoctorScheduleDto } from './dto/info-doctor_schedule.dto';

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
        throw new HttpException('Schedule overlapped', HttpStatus.INTERNAL_SERVER_ERROR);
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

  async getDoctorSchedulesByDoctorId(doctor_id: string): Promise<any[]> {
    const schedules = await this.doctorSchedulesRepository.getDoctorSchedulesByDoctorId(doctor_id);

    const groupedByDay = schedules.reduce((acc, schedule) => {
      const day = schedule.day.toISOString().split('T')[0];
      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push({
        start_time: schedule.start_time,
        end_time: schedule.end_time,
      });

      return acc;
    }, {});

    return Object.entries(groupedByDay).map(([day, times]) => ({
      day,
      times,
    }));
  }

  async findDoctorScheduleByDoctorIdAndDay(doctorId: string, day: Date) {
    const schedules = await this.doctorSchedulesRepository.getDoctorScheduleByDoctorIdAndDay(doctorId, day);
    return schedules.map((schedule) => new InfoDoctorScheduleDto(schedule));
  }
}
