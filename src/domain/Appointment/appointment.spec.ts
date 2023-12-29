import { HttpRequest } from '@app/protocols/http';
import { Appointment } from './appointment';
import { MissingParamError } from '@app/errors/MissingParamError';

describe('Appointment Service', () => {
  const makeSut = (props: HttpRequest) => {
    const newAppointment = new Appointment(props.body);
    return newAppointment;
  };

  it('should be possible to create a new appointment', () => {
    const httpRequest = {
      body: {
        userId: 'any_userId',
        hour: 'any_hour',
        scheduleId: 'any_scheduleId',
      },
    };
    const newAppointment = makeSut(httpRequest);

    if (!newAppointment.props)
      throw new Error('Error creating new appointment');

    expect(Object.values(newAppointment.props)).toBeTruthy();
  });

  it('should throw missing error param if none userId is provided', () => {
    const httpRequest = {
      body: {
        hour: 'any_hour',
        scheduleId: 'any_scheduleId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('userId'));
  });

  it('should throw missing error param if none hour is provided', () => {
    const httpRequest = {
      body: {
        userId: 'any_userId',
        scheduleId: 'any_scheduleId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('hour'));
  });

  it('should throw missing error param if none scheduleId is provided', () => {
    const httpRequest = {
      body: {
        userId: 'any_userId',
        hour: 'any_hour',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('scheduleId'),
    );
  });
});
