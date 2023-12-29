import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { z } from 'zod';

interface AddressProps {
  id?: string;
  street: string;
  zipcode: string;
  complement?: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  userId?: string;
}

interface NewAddress {
  body: AddressProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Address {
  props: AddressProps;

  constructor(props: AddressProps) {
    const newUser = this.handle(props);

    if (newUser.statusCode >= 300) {
      throw newUser.body;
    }

    this.props = newUser.body;
  }

  private handle(props: AddressProps): NewAddress {
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

  private isValid(params: AddressProps): IsValidMethodReturn {
    const addressSchema = z.object({
      street: z.string().min(3, { message: 'Invalid' }),
      zipcode: z.string().min(8, { message: 'Invalid' }),
      number: z.number(),
      complement: z.string().min(3, { message: 'Invalid' }).optional(),
      neighborhood: z.string().min(3, { message: 'Invalid' }),
      city: z.string().min(2, { message: 'Invalid' }),
      state: z.string().min(2, { message: 'Invalid' }),
      country: z.string().min(2, { message: 'Invalid' }),
      userId: z.string().min(2, { message: 'Invalid' }),
    });

    const addressIsValid = addressSchema.safeParse(params);
    if (!addressIsValid.success) {
      const errorPath = addressIsValid.error.errors[0].path[0].toString();
      const errorAddress = addressIsValid.error.errors[0].message;
      const errorBody =
        errorAddress === 'Invalid'
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
      body: null,
      statusCode: 200,
    };
  }
}
