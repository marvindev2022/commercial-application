import { ScheduleRepository } from '@app/repositories/Schedule/schedule';
import { Schedule } from '@domain/Schedule/Schedule';
import { NotFoundException } from '@nestjs/common';

export class InMemoryScheduleRepository implements ScheduleRepository {
  public schedule: Schedule[] = [];

  async create(schedule: Schedule): Promise<string> {
    try {
      this.schedule.push(schedule);
      return schedule.props.id as string;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findScheduleById(id: string): Promise<Schedule> {
    const schedule = this.schedule.find(
      (schedule) => schedule.props && schedule.props.id === id,
    );

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  async findScheduleByUserId(adminId: string): Promise<Schedule[]> {
    const schedule = this.schedule.filter(
      (schedule) => schedule.props.adminId === adminId,
    );

    if (!schedule.length) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  async findScheduleByDate(date: Date): Promise<Schedule[]> {
    const schedule = this.schedule.filter(
      (schedule) => schedule.props.date === date,
    );

    if (!schedule.length) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

 
  async findAllSchedules(): Promise<Schedule[]> {
    return this.schedule;
  }

  async updateSchedule(
    scheduleId: string,
    updatedSchedule: Schedule,
  ): Promise<Schedule> {
    const index = this.schedule.findIndex(
      (schedule) => schedule.props.id === scheduleId,
    );

    if (index === -1) {
      throw new NotFoundException('Schedule not found');
    }

    this.schedule[index] = updatedSchedule;
    return updatedSchedule;
  }

  async deleteSchedule(scheduleId: string): Promise<string> {
    const index = this.schedule.findIndex(
      (schedule) => schedule.props.id === scheduleId,
    );

    if (index === -1) {
      throw new NotFoundException('Schedule not found');
    }

    this.schedule.splice(index, 1);
    return 'Schedule deleted successfully';
  }
}
