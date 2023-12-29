import { AppointmentRepository } from '@app/repositories/Appointment/appointment';
import { Appointment } from '@domain/Appointment/appointment';
import { IAppointment } from '@infra/database/prisma/repositories/appointment/prisma-appointment-repository';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface RegisterAppointmentDTO {
  id?: string;
  userId: string;
  hourId: string;
  scheduleId: string;
}

@Injectable()
export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async create(request: RegisterAppointmentDTO): Promise<string> {
    const newAppointment = new Appointment(request);
    try {
      const appointment =
        await this.appointmentRepository.create(newAppointment);
      if (!appointment) {
        throw new BadRequestException('Erro ao criar o agendamento');
      }

      return appointment;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getAppointmentById(id: string): Promise<IAppointment> {
    const appointment =
      await this.appointmentRepository.findAppointmentById(id);
    if (!appointment) {
      throw new BadRequestException('Error getting appointment');
    }

    return appointment;
  }

  async getAppointmentByUserId(userId: string): Promise<IAppointment[]> {
    const appointment =
      await this.appointmentRepository.findAppointmentByUserId(userId);
    if (!appointment) {
      throw new BadRequestException('Error getting appointment');
    }

    return appointment;
  }

  async getAppointmentsAll(): Promise<any[]> {
    const appointment = await this.appointmentRepository.findAppointmentAll();
    if (!appointment) {
      throw new BadRequestException('Error getting appointment');
    }

    return appointment;
  }

  async updateAppointment(request: any, id: string): Promise<IAppointment> {
    const appointment = await this.appointmentRepository.updateAppointment(
      id,
      request,
    );
    if (!appointment) {
      throw new BadRequestException('Error updating appointment');
    }

    return appointment;
  }

  async deleteAppointment(id: string): Promise<string> {
    const appointment = await this.appointmentRepository.deleteAppointment(id);
    if (!appointment) {
      throw new BadRequestException('Error deleting appointment');
    }

    return appointment;
  }
}
