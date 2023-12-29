import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface HoursProps {
  id?: string;
  time: Date;
  scheduleId: string;
}

interface NewHours {
  body: HoursProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Hours {
  props: HoursProps;

  constructor(props: HoursProps) {
    const newHours = this.handle(props);

    if (newHours.statusCode >= 300) {
      throw newHours.body;
    }

    this.props = newHours.body;
  }

  private handle(props: HoursProps): NewHours {
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

  private isValid(params: HoursProps): IsValidMethodReturn {
    const hoursSchema = z.object({
      time: z.date().refine((data) => {
        const now = new Date();
        const time = new Date(data);
        return time >= now;
      }),
      scheduleId: z.string().min(3, { message: 'Invalid' }),
    });
    const validateParams = {
      time: new Date(params.time),
      scheduleId: params.scheduleId,
    };

    const hoursIsValid = hoursSchema.safeParse(validateParams);
    if (!hoursIsValid.success) {
      const errorPath = hoursIsValid.error.issues[0].path[0].toString();
      const errorMessage = hoursIsValid.error.issues[0].message;
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
