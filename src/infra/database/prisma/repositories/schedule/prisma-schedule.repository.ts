import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Schedule } from '@domain/Schedule/Schedule';
import generateHours from 'src/utils/generateHours';

export interface IDBDatabaseInfotimeScheduler {
  id: string;
  adminId: string;
  date: Date;
  hours: {
    id: string;
    time: Date;
    scheduleId: string;
  }[];
  appointments: {
    id: string;
    hour: Date;
    hourId: string;
    scheduleId: string;
  }[];
}
@Injectable()
export class PrismaScheduleRepository {
  constructor(private prismaService: PrismaService) {}

  async create(schedule: Schedule): Promise<string> {
    try {
      if (schedule instanceof Error) {
        throw new BadRequestException(schedule.message, {
          cause: schedule,
          description: schedule.stack,
        });
      }

      const newSchedule = new Schedule(schedule.props);
      const parseTime = (timeString: string) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return { hours, minutes, seconds };
      };

      const startSchedule = new Date(
        `${newSchedule.props.date}T${newSchedule.props.start}Z`,
      );
      const endSchedule = new Date(
        `${newSchedule.props.date}T${newSchedule.props.end}Z`,
      );
      const interval = parseTime('00:30:00');
      const hours = generateHours(startSchedule, endSchedule, interval);
      const date = new Date(newSchedule.props.date).toISOString();
      const dateExists = await this.prismaService.schedule.findMany({
        where: {
          date,
        },
      });
      if (dateExists.length > 0) {
        throw new BadRequestException('Data já cadastrada');
      }
      const response = await this.prismaService.schedule.create({
        data: {
          adminId: newSchedule.props.adminId,
          date,
        },
        select: {
          id: true,
          adminId: true,
          date: true,
        },
      });
      if (!response) {
        throw new BadRequestException('Erro ao criar agendamento');
      }
      const finallyCreation = await this.prismaService.hour.createMany({
        data: hours.map((hour) => ({
          time: hour,
          scheduleId: response.id,
        })),
      });
      if (!finallyCreation) {
        throw new BadRequestException('Erro ao criar agendamento');
      }
      return 'Registro de agenda finalizado';
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findScheduleById(scheduleId: string): Promise<IDBDatabaseInfotimeScheduler> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: scheduleId,
      },
      select: {
        id: true,
        adminId: true,
        date: true,
      },
    });
    if (!schedule) throw new BadRequestException('Agendamento não encontrado');
    const hours = await this.prismaService.hour.findMany({
      where: {
        scheduleId,
      },
      select: {
        id: true,
        time: true,
        scheduleId: true,
      },
    });
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        scheduleId,
      },
      select: {
        id: true,
        hour: true,
        hourId: true,
        scheduleId: true,
      },
    });

    const scheduleProps = {
      id: schedule.id,
      adminId: schedule.adminId,
      date: new Date(schedule.date),
      hours,
      appointments,
    };
    return scheduleProps as any;
  }

  async updateSchedule(schedule: Schedule): Promise<string> {
    const { ...scheduleProps } = schedule;
    await this.prismaService.schedule.update({
      where: {
        id: scheduleProps.props.id,
      },
      data: {
        ...scheduleProps.props,
        date: scheduleProps.props.date.toISOString(),
      },
    });

    return 'Agendamento atualizado com sucesso';
  }

  async deleteSchedule(scheduleId: string): Promise<void> {
    await this.prismaService.schedule.delete({
      where: {
        id: scheduleId,
      },
    });
  }

  async findScheduleByDate(date: Date): Promise<Schedule[] | Error> {
    try {
      const scheduleSnapshot = await this.prismaService.schedule.findMany({
        where: {
          date: date.toISOString(),
        },
      });

      if (!scheduleSnapshot) {
        throw new BadRequestException('Agendamento não encontrado');
      }
      return scheduleSnapshot as any;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar agendamento do Usuário');
    }
  }

  async findAllSchedules(FilterDate: Date): Promise<any[] | Error> {
    try {
      const date = FilterDate && new Date(FilterDate);
      const scheduleSnapshot = await this.prismaService.schedule.findMany();
  
      if (!scheduleSnapshot) {
        throw new BadRequestException('Agendamento não encontrado');
      }
  
      if (date instanceof Date) {
        const filterSchedules = scheduleSnapshot.filter((schedule) => {
          return (
            schedule.date.getUTCDate() === date.getUTCDate() &&
            schedule.date.getUTCMonth() === date.getUTCMonth() &&
            schedule.date.getUTCFullYear() === date.getUTCFullYear()
          );
        });
  
        const schedulesWithDetails = await Promise.all(
          filterSchedules.map(async (schedule) => {
            const scheduleId = schedule.id;
            const hours = await this.prismaService.hour.findMany({
              where: {
                scheduleId,
              },
              select: {
                id: true,
                time: true,
                scheduleId: true,
              },
            });
  
            const appointments = await this.prismaService.appointment.findMany({
              where: {
                scheduleId,
              },
              select: {
                id: true,
                hour: true,
                hourId: true,
                scheduleId: true,
              },
            });
  
            return {
              ...schedule,
              hours,
              appointments,
            };
          })
        );
  
        return schedulesWithDetails;
      }
  
      const schedulesWithDetails = await Promise.all(
        scheduleSnapshot.map(async (schedule) => {
          const scheduleId = schedule.id;
          const hours = await this.prismaService.hour.findMany({
            where: {
              scheduleId,
            },
            select: {
              id: true,
              time: true,
              scheduleId: true,
            },
          });
  
          const appointments = await this.prismaService.appointment.findMany({
            where: {
              scheduleId,
            },
            select: {
              id: true,
              hour: true,
              hourId: true,
              scheduleId: true,
            },
          });
  
          const scheduleProps = {
            id: schedule.id,
            adminId: schedule.adminId,
            date: new Date(schedule.date),
            hours,
            appointments,
          };
  
          return scheduleProps;
        })
      );
  
      return schedulesWithDetails;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar agendamento');
    }
  }
  

  async deleteScheduleByUserId(id: string): Promise<void> {
    await this.prismaService.schedule.deleteMany({
      where: {
        adminId: id,
      },
    });
  }
}
