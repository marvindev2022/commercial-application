import { ScheduleRepository } from '@app/repositories/Schedule/schedule';
import { Schedule } from '@domain/Schedule/Schedule';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface RegisterScheduleDTO {
  adminId: string;
  date: Date;
  start: string;
  end: string;
}
export interface UpdateScheduleDTO extends RegisterScheduleDTO {
  id: string;
}
@Injectable()
export class ScheduleService {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async create(request: RegisterScheduleDTO): Promise<Error | string> {
    const newSchedule = new Schedule(request);

    try {
      const schedule = await this.scheduleRepository.create(newSchedule);

      if (!schedule) {
        throw new BadRequestException('Erro ao criar o cronograma');
      }

      return schedule;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getScheduleById(id: string): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findScheduleById(id);
    if (!schedule) {
      throw new BadRequestException('Error getting schedule');
    }

    return schedule;
  }

  async getScheduleByDate(date: Date): Promise<Schedule[]> {
    const schedule = await this.scheduleRepository.findScheduleByDate(date);
    if (!schedule) {
      throw new BadRequestException('Error getting schedule');
    }

    return schedule;
  }

  async getAllSchedules(date: Date): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.findAllSchedules(date);
    if (!schedules) {
      throw new BadRequestException('Error getting schedules');
    }

    return schedules;
  }

  async updateSchedule(
    request: UpdateScheduleDTO,
    id: string,
  ): Promise<Schedule> {
    const newSchedule = new Schedule(request);
    const schedule = await this.scheduleRepository.updateSchedule(
      id,
      newSchedule,
    );
    if (!schedule) {
      throw new BadRequestException('Error updating schedule');
    }

    return schedule;
  }

  async deleteSchedule(id: string): Promise<string> {
    const schedule = await this.scheduleRepository.deleteSchedule(id);
    if (!schedule) {
      throw new BadRequestException('Error deleting schedule');
    }

    return 'Schedule deleted successfully';
  }
}
