import { MissingParamError } from '@app/errors/MissingParamError';
import { HttpRequest } from '@app/protocols/http';
import { Address } from './Addres';

describe('Address', () => {
  const makeSut = (props: HttpRequest) => {
    const newAddress = new Address(props.body);

    return newAddress;
  };
  it("should be possible to create a new address with 'complement' field as optional", () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };
    const newAddress = makeSut(httpRequest);

    if (!newAddress.props) throw new Error('Error creating new address');

    expect(Object.values(newAddress.props)).toBeTruthy();
  });
  it('should throw missing error param if none street is provided', () => {
    const httpRequest = {
      body: {
        number: 123,
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('street'));
  });

  it('should throw missing error param if none number is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('number'));
  });

  it('should throw missing error param if none city is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        state: 'any_state',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('city'));
  });

  it('should throw missing error param if none state is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        city: 'any_city',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        zipcode: 'any_zipcode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('state'));
  });

  it('should throw missing error param if none country is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('country'),
    );
  });

  it('should throw missing error param if none zipcode is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('zipcode'),
    );
  });

  it('should throw missing error param if none neighborhood is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        zipcode: 'any_zipCode',
        userId: 'any_userId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('neighborhood'),
    );
  });

  it('should throw missing error param if none userId is provided', () => {
    const httpRequest = {
      body: {
        street: 'any_street',
        number: 123,
        complement: 'any_complement',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        zipcode: 'any_zipCode',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('userId'));
  });
});
