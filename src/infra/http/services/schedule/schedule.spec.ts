import { InMemoryScheduleRepository } from '@test/repositories/in-memory-schedule-repository';
import { ScheduleService } from './schedule.service';
import { Schedule } from '@domain/Schedule/Schedule';

describe('Schedule', () => {
  it('should create a new schedule', async () => {
    const scheduleRepository = new InMemoryScheduleRepository();
    const scheduleService = new ScheduleService(scheduleRepository);
    const newSchedule = new Schedule({
      adminId: 'any_adminId',
      date: new Date('2024-10-10T12:00:00-03:00'),
      start: 'any_start',
      end: 'any_end',
    });

    if (!newSchedule.props) {
      throw new Error('Error creating new schedule');
    }

    await scheduleService.create(newSchedule.props);
    expect(scheduleRepository.schedule[0].props).toEqual(newSchedule);
  });

  it('should find a schedule by id with undefined id', async () => {
    const scheduleRepository = new InMemoryScheduleRepository();
    const scheduleService = new ScheduleService(scheduleRepository);
    const newSchedule = new Schedule({
      id: 'any_id',
      adminId: 'any_adminId',
      date: new Date('2024-10-10T12:00:00-03:00'),
      start: 'any_start',
      end: 'any_end',
    });

    if (!newSchedule.props.id) {
      throw new Error('Error creating new schedule');
    }

    await scheduleService.create(newSchedule.props);

    const schedule = await scheduleService.getScheduleById(
      newSchedule.props.id,
    );
    expect(schedule).toEqual(newSchedule);
  });

  it('should find a schedule by id with wrong id', async () => {
    const scheduleRepository = new InMemoryScheduleRepository();
    const scheduleService = new ScheduleService(scheduleRepository);
    const newSchedule = new Schedule({
      id: 'any_id',
      adminId: 'any_adminId',
      date: new Date('2024-10-10T12:00:00-03:00'),
      start: 'any_start',
      end: 'any_end',
    });

    if (!newSchedule.props.id) {
      throw new Error('Error creating new schedule');
    }

    await scheduleService.create(newSchedule.props);

    await expect(
      scheduleService.getScheduleById('wrong_id'),
    ).rejects.toThrowError('Schedule not found');
  });

  it('should find a schedule by date', async () => {
    const scheduleRepository = new InMemoryScheduleRepository();
    const scheduleService = new ScheduleService(scheduleRepository);
    const newSchedule = new Schedule({
      adminId: 'any_adminId',
      date: new Date('2024-10-10T12:00:00-03:00'),
      start: 'any_start',
      end: 'any_end',
    });

    if (!newSchedule.props) {
      throw new Error('Error creating new schedule');
    }

    await scheduleService.create(newSchedule.props);

    const schedule = await scheduleService.getScheduleByDate(
      newSchedule.props.date,
    );
    expect(schedule[0].props).toEqual(newSchedule.props);
  });

  it('should update a schedule', async () => {
    const scheduleRepository = new InMemoryScheduleRepository();
    const scheduleService = new ScheduleService(scheduleRepository);
    const newSchedule = new Schedule({
      id: 'any_id',
      adminId: 'any_adminId',
      date: new Date('2024-10-10T12:00:00-03:00'),
      start: 'any_start',
      end: 'any_end',
    });

    if (!newSchedule.props.id) {
      throw new Error('Error creating new schedule');
    }

    await scheduleService.create(newSchedule.props);

    const schedule = await scheduleService.updateSchedule(
      { ...newSchedule.props, id: newSchedule.props.id },
      newSchedule.props.id,
    );
    expect(schedule).toEqual(newSchedule);
  });
});
