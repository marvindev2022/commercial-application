import { Schedule } from '@domain/Schedule/Schedule';

export abstract class ScheduleRepository {
  abstract create(schedule: Schedule): Promise<string>;

  abstract findScheduleById(id: string): Promise<Schedule>;

  abstract findScheduleByUserId(userId: string): Promise<Schedule[]>;

  abstract findScheduleByDate(date: Date): Promise<Schedule[]>;

  abstract findAllSchedules(date: Date): Promise<Schedule[]>;

  abstract updateSchedule(
    scheduleId: string,
    schedule: Schedule,
  ): Promise<Schedule>;

  abstract deleteSchedule(scheduleId: string): Promise<string>;
}
