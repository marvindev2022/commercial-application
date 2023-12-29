import { InvalidParamError } from '@app/errors/InvalidParamError';
import { makeHash } from '@app/protocols/crypto/hash/makeHash';
import z from 'zod';

interface AdminProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

interface NewAdmin {
  body: AdminProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Admin {
  props: AdminProps;

  constructor(props: AdminProps) {
    const newAdmin = this.handle(props);
    if (newAdmin.statusCode >= 300) {
      throw newAdmin.body;
    }

    this.props = {
      ...newAdmin.body,
      password: makeHash(newAdmin.body.password),
    }
  }

  private handle(props: AdminProps): NewAdmin {
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

  private isValid(params: AdminProps): IsValidMethodReturn {
    const adminSchema = z.object({
      name: z.string().min(3, { message: 'Invalid' }),
      email: z.string().email({ message: 'Invalid' }),
      password: z.string().min(3, { message: 'Invalid' }),
    });
    const adminIsValid = adminSchema.safeParse(params);

    if (!adminIsValid.success) {
      const { message } = adminIsValid.error.errors[0];
      const error = new InvalidParamError(message);
      return {
        isValid: false,
        body: error,
        statusCode: 400,
      };
    }

    return {
      isValid: true,
      body: params,
      statusCode: 200,
    };
  }

  public getId(): string {
    return this.props.id as string;
  }
}
