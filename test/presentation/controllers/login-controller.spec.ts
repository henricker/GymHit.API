import { AuthUseCase } from '../../../src/domain/usecases/authentication/auth-usecase';
import { IUseCase } from '../../../src/domain/usecases/usecase.interface';
import { LoginController } from '../../../src/presentation/controllers/login-controller';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../../../src/presentation/helpers/http-helpers';
import { IHttpRequest, IValidation } from '../../../src/presentation/protocols';
import { mockAuthenticationParams } from '../../mocks/mock-account';

type SutType = {
  sut: LoginController;
  validationStub: IValidation;
  authenticationStub: AuthUseCase;
};

const makeFakeRequest = (): IHttpRequest => ({
  body: mockAuthenticationParams(),
});

const makeAuthUseCase = (): IUseCase => new AuthUseCase();

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    /* eslint-disable no-unused-vars */
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeSut = (): SutType => {
  const validationStub = makeValidation();
  const authenticationStub = makeAuthUseCase();
  const sut = new LoginController(validationStub, authenticationStub);

  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe('#Controller - Login', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();

    const validationSpy = jest.spyOn(validationStub, 'validate');
    const request = makeFakeRequest();
    await sut.handle(request);

    expect(validationSpy).toHaveBeenCalledWith(request.body);
  });

  it('Should return 400 if validation return one error', async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, 'validate')
      .mockImplementationOnce(() => new Error('any_error'));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new Error('any_error')));
  });

  it('should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error('any_error')));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'handle');

    const request = makeFakeRequest();
    await sut.handle(request);

    expect(authSpy).toHaveBeenCalledWith({
      email: request.body.email,
      password: request.body.password,
    });
  });

  it('should return 401 if Authentication returns null', async () => {
    const { sut, authenticationStub } = makeSut();

    jest.spyOn(authenticationStub, 'handle').mockResolvedValueOnce(null);

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'handle').mockRejectedValueOnce(new Error());
    const promise = await sut.handle(makeFakeRequest());
    expect(promise).toEqual(serverError(new Error()));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'handle').mockResolvedValueOnce('any_token');
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
  });
});
