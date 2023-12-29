import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface ScheduleProps {
  id?: string;
  adminId: string;
  date: Date;
  start: string;
  end: string;
}
interface NewSchedule {
  body: ScheduleProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Schedule {
  props: ScheduleProps;

  constructor(props: ScheduleProps) {
    const newSchedule = this.handle(props);
    if (newSchedule.statusCode >= 300) {
      throw newSchedule.body;
    }

    this.props = newSchedule.body;
  }

  private handle(props: ScheduleProps): NewSchedule {
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
  private isValid(params: ScheduleProps): IsValidMethodReturn {
    const scheduleSchema = z.object({
      adminId: z.string().min(3, { message: 'Invalid' }),
      start: z.string().min(3, { message: 'Invalid' }),
      end: z.string().min(3, { message: 'Invalid' }),
      date: z.date().refine(
        (data) => {
          const today = Number(new Date());
          const date = Number(new Date(data));
          return date >= today;
        },
        { message: 'Invalid' },
      ),
    });
    const validateParams = {
      ...params,
      date: new Date(params.date),
    };
    const scheduleIsValid = scheduleSchema.safeParse(validateParams);
    if (!scheduleIsValid.success) {
      const errorPath = scheduleIsValid.error.issues[0].path[0].toString();
      const errorMessage = scheduleIsValid.error.issues[0].message;
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
