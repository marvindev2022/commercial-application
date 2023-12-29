import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface AppointmentsProps {
  id?: string;
  userId: string;
  hourId: string;
  scheduleId: string;
}

interface NewAppointment {
  body: AppointmentsProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Appointment {
  props: AppointmentsProps;

  constructor(props: AppointmentsProps) {
    const newAppointment = this.handle(props);
    if (newAppointment.statusCode >= 300) {
      throw newAppointment.body;
    }
    this.props = newAppointment.body;
  }

  private handle(props: AppointmentsProps): NewAppointment {
    const { isValid, body, statusCode } = this.isValid(props);
    if (!isValid) {
      return {
        body: body,
        statusCode: statusCode,
      };
    }
    return {
      body: props,
      statusCode: 200,
    };
  }

  private isValid(params: AppointmentsProps): IsValidMethodReturn {
    const appointmentSchema = z.object({
      userId: z.string().min(3, { message: 'Invalid' }),
      hourId: z.string().min(3, { message: 'Invalid' }),
      scheduleId: z.string().min(3, { message: 'Invalid' }),

    });

    const appointmentIsValid = appointmentSchema.safeParse(params);
    if (!appointmentIsValid.success) {
      const errorPath = appointmentIsValid.error.issues[0].path[0].toString();
      const errorMessage = appointmentIsValid.error.issues[0].message;

      const errorBody =
        errorMessage === 'Invalid'
          ? new InvalidParamError(errorPath)
          : new MissingParamError(errorPath);
      return {
        isValid: false,
        body: errorBody,
        statusCode: 400,
      };
    }
    return {
      isValid: true,
      body: params,
      statusCode: 200,
    };
  }
}
