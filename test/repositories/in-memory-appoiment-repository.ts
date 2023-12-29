import { AppointmentRepository } from '@app/repositories/Appointment/appointment';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointment: any[] = [];

  async create(appointment: any): Promise<string> {
    try {
      this.appointment.push(appointment);
      return appointment.props.id as string;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findAppointmentById(id: string): Promise<any> {
    const appointment = this.appointment.find(
      (appointment) => appointment.props && appointment.props.id === id,
    );

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }

  async findAppointmentByUserId(userId: string): Promise<any[]> {
    const appointment = this.appointment.filter(
      (appointment) => appointment.props.userId === userId,
    );

    if (!appointment.length) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }

  async findAppointmentByDate(date: Date): Promise<any[]> {
    const appointment = this.appointment.filter(
      (appointment) => appointment.props.date === date,
    );

    if (!appointment.length) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }

  async findAppointmentByUserIdAndDate(
    userId: string,
    date: Date,
  ): Promise<any[]> {
    const appointment = this.appointment.filter(
      (appointment) =>
        appointment.props.userId === userId && appointment.props.date === date,
    );

    if (!appointment.length) {
      throw new Error('Appointment not found');
    }

    return appointment;
  }

  async findAppointmentAll(): Promise<any[]> {
    return this.appointment;
  }
  
  async updateAppointment(
    appointmentId: string,
    appointment: any,
  ): Promise<any> {
    const appointmentIndex = this.appointment.findIndex(
      (appointment) => appointment.props.id === appointmentId,
    );

    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    this.appointment[appointmentIndex] = appointment;

    return appointment;
  }

  async deleteAppointment(appointmentId: string): Promise<string> {
    const appointmentIndex = this.appointment.findIndex(
      (appointment) => appointment.props.id === appointmentId,
    );

    if (appointmentIndex === -1) {
      throw new Error('Appointment not found');
    }

    this.appointment.splice(appointmentIndex, 1);

    return appointmentId;
  }
}
