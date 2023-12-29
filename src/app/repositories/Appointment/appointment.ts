import { Appointment } from '@domain/Appointment/appointment';
import { IAppointment } from '@infra/database/prisma/repositories/appointment/prisma-appointment-repository';

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<string>;

  abstract findAppointmentById(id: string): Promise<IAppointment>;

  abstract findAppointmentByUserId(userId: string): Promise<IAppointment[]>;

  abstract findAppointmentByDate(date: Date): Promise<IAppointment[]>;

  abstract findAppointmentAll(): Promise<any[]>;
  
  abstract updateAppointment(
    appointmentId: string,
    appointment: Appointment,
  ): Promise<IAppointment>;

  abstract deleteAppointment(appointmentId: string): Promise<string>;
}
