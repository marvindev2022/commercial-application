import { Schedule } from './Schedule';
import { MissingParamError } from '@app/errors/MissingParamError';
import { HttpRequest } from '@app/protocols/http';

describe('Schedule', () => {
  const makeSut = (props: HttpRequest) => {
    const newSchedule = new Schedule(props.body);

    return newSchedule;
  };
  it('should be possible to create a new schedule', () => {
    const httpRequest = {
      body: {
        adminId: 'any_adminId',
        date: '12/12/2024',
        start: '08:00:00',
        end: '20:00:00',
      },
    };
    const newSchedule = makeSut(httpRequest);

    if (!newSchedule.props) throw new Error('Error creating new schedule');

    expect(Object.values(newSchedule.props)).toBeTruthy();
  });

  it('should throw missing error param if none adminId is provided', () => {
    const httpRequest = {
      body: {
        date: new Date(),
        start: '08:00:00',
        end: '20:00:00',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('adminId'),
    );
  });

  it('should throw missing error param if none date is provided', () => {
    const httpRequest = {
      body: {
        adminId: 'any_adminId',
        start: '08:00:00',
        end: '20:00:00',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('date'));
  });

  it('should throw missing error param if none start is provided', () => {
    const httpRequest = {
      body: {
        adminId: 'any_adminId',
        date: new Date(),
        end: '20:00:00',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('start'));
  });

  it('should throw missing error param if none end is provided', () => {
    const httpRequest = {
      body: {
        adminId: 'any_adminId',
        date: new Date(),
        start: '08:00:00',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('end'));
  });
});
