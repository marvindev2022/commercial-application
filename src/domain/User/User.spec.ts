import { MissingParamError } from '@app/errors/MissingParamError';
import { HttpRequest } from '@app/protocols/http';
import { User } from './User';

describe('User', () => {
  const makeSut = (props: HttpRequest) => {
    const newUser = new User(props.body);

    return newUser;
  };

  it('should be possible to create a new user without adress', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        cpf: '11111111111',
        phone: '11 11111-1111',
        birthDate: new Date(),
        photo: 'any_photo',
        password: 'any_password',
      },
    };
    const newUser = makeSut(httpRequest);

    if (!newUser.props) throw new Error('Error creating new user');

    expect(Object.values(newUser.props)).toBeTruthy();
  });

  it('should throw missing error param if none name is provided', () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        cpf: '11111111111',
        phone: '11 11111-1111',
        password: 'any_password',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('name'));
  });

  it('should throw missing error param if none email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        cpf: '11111111111',
        phone: '11 11111-1111',
        password: 'any_password',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('email'));
  });

  it('should throw missing error param if none cpf is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        phone: '11 11111-1111',
        password: 'any_password',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('cpf'));
  });

  it('should throw missing error param if none phone is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        cpf: '11111111111',
        password: 'any_password',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('phone'));
  });

  it('should throw missing error param if none password is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        cpf: '11111111111',
        phone: '11 11111-1111',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('password'),
    );
  });

  it('should return an new user if request is valid', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        cpf: '11111111111',
        phone: '11 11111-1111',
        password: 'any_password',
        photo: 'any_photo',
        birthDate: new Date(),
      },
    };
    const newUser = makeSut(httpRequest);

    if (!newUser.props) throw new Error('Error creating new user');

    expect(Object.values(newUser.props)).toBeTruthy();
  });
});
