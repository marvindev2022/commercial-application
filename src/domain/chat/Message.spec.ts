import { HttpRequest } from '@app/protocols/http';
import { Message } from './Message';
import { MissingParamError } from '@app/errors/MissingParamError';

describe('Message', () => {
  const makeSut = (props: HttpRequest) => {
    const newMessage = new Message(props.body);

    return newMessage;
  };

  it('should throw missing error param if none title is provided', () => {
    const httpRequest = {
      body: {
        content: 'any_content',
        senderId: 'any_senderId',
        receiverId: 'any_receiverId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('title'));
  });

  it('should throw missing error param if none content is provided', () => {
    const httpRequest = {
      body: {
        title: 'any_title',
        senderId: 'any_senderId',
        receiverId: 'any_receiverId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('content'),
    );
  });

  it('should throw missing error param if none senderId is provided', () => {
    const httpRequest = {
      body: {
        title: 'any_title',
        content: 'any_content',
        receiverId: 'any_receiverId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('senderId'),
    );
  });

  it('should throw missing error param if none receiverId is provided', () => {
    const httpRequest = {
      body: {
        title: 'any_title',
        content: 'any_content',
        senderId: 'any_senderId',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('receiverId'),
    );
  });

  it('should return 200 statusCode if all params are provided', () => {
    const httpRequest = {
      body: {
        title: 'any_title',
        content: 'any_content',
        senderId: 'any_senderId',
        receiverId: 'any_receiverId',
      },
    };

    const sut = makeSut(httpRequest);

    expect(sut).toBeTruthy();
  });
});
