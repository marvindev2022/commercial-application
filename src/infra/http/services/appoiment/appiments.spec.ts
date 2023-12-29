import { Appointment } from '@domain/Appointment/appointment';
import { AppointmentService } from './appoiment.service';
import { InMemoryAppointmentRepository } from '@test/repositories/in-memory-appoiment-repository';

describe('Appointment Service', () => {
  it('should create a new appointment', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const appointmentService = new AppointmentService(
      appointmentRepository as any,
    );

    const newAppointment = new Appointment({
      userId: 'any_userId',
      hour: '12/12/2024T12:00:00',
      scheduleId: 'any_scheduleId',
    });

    if (!newAppointment.props) {
      throw new Error('Error creating new appointment');
    }

    const appointment = await appointmentService.create(newAppointment.props);
    expect(appointmentRepository.appointment[0]).toEqual(appointment);
  });
  it('should find a appointment by id with undefined id', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const appointmentService = new AppointmentService(
      appointmentRepository as any,
    );
    const newAppointment = new Appointment({
      id: 'any_id',
      userId: 'any_userId',
      hour: 'any_hour',
      scheduleId: 'any_scheduleId',
    });

    if (!newAppointment.props.id) {
      throw new Error('Error creating new appointment');
    }

    await appointmentService.create(newAppointment.props);

    const appointment = await appointmentService.getAppointmentById(
      newAppointment.props.id,
    );
    expect(appointment).toEqual(newAppointment.props.id);
  });
});
