import { AppointmentRepository } from '@app/repositories/Appointment/appointment';
import { Appointment } from '@domain/Appointment/appointment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { where } from 'firebase/firestore';

export interface IAppointment {
  id: String;
  userId: String;
  hourId: String;
  scheduleId: String;
}
@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prismaService: PrismaService) {}

  async create(appointment: Appointment): Promise<string> {
    try {
      if (appointment instanceof Error) {
        throw new BadRequestException(appointment.message, {
          cause: appointment,
          description: appointment.stack,
        });
      }

      const scheduleAppointmentExists =
        await this.prismaService.schedule.findFirst({
          where: {
            id: appointment.props.scheduleId,
          },
        });
      const newAppointment = new Appointment(appointment.props);

      const appointmentExists = await this.prismaService.appointment.findFirst({
        where: {
          hourId: newAppointment.props.hourId,
        },
      });

      const appointmentExistsByUser =
        await this.prismaService.appointment.findFirst({
          where: {
            userId: newAppointment.props.userId,
            hourId: newAppointment.props.hourId,
          },
        });

      if (appointmentExistsByUser ?? appointmentExists) {
        throw new BadRequestException(
          appointmentExistsByUser
            ? 'Seu horario já foi reservado!'
            : 'Horario indisponivel!',
        );
      }

      const id = await this.prismaService.appointment.create({
        data: {
          hourId: newAppointment.props.hourId,
          scheduleId: newAppointment.props.scheduleId,
          userId: newAppointment.props.userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        select: {
          id: true,
        },
      });

      return id.id;
    } catch (error: any) {
      throw new BadRequestException(error.message, {
        cause: error,
        description: error.stack,
      });
    }
  }

  async findAppointmentById(id: string): Promise<IAppointment> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new BadRequestException('Consulta não encontrada!');
    }
    return appointment;
  }

  async findAppointmentByUserId(userId: string): Promise<IAppointment[]> {
    const appointment = await this.prismaService.appointment.findMany({
      where: { userId },
    });
    if (!appointment) {
      throw new BadRequestException('Consulta não encontrada para usuario!');
    }
    return appointment;
  }

  async findAppointmentByDate(date: Date): Promise<IAppointment[]> {
    const appointment = await this.prismaService.appointment.findMany({
      where: { hourId: date.toISOString() },
    });
    if (!appointment) {
      throw new BadRequestException('Consulta não encontrada por data!');
    }
    return appointment;
  }

  async findAppointmentAll(): Promise<any[]> {
    const appointment = await this.prismaService.appointment.findMany();
    if (!appointment) {
      throw new BadRequestException('Nenhuma consulta não encontrada!');
    }
    const hour = await this.prismaService.hour.findMany({
      where: { appointments: { some: { id: appointment[0].id } } },
    });
    if(hour){

    return appointment.map((appointment) => {
      return {
        ...appointment,
        hour: hour[0],
      };
    })
  }
    return appointment;
  }

  async updateAppointment(
    appointmentId: string,
    appointment: Appointment,
  ): Promise<IAppointment> {
    const updatedAppointment = await this.prismaService.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
    });
    return updatedAppointment;
  }

  async deleteAppointment(appointmentId: string): Promise<string> {
    const appointment = await this.prismaService.appointment.delete({
      where: { id: appointmentId },
    });
    return appointment.id;
  }
}
