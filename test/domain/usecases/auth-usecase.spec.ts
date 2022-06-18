import { IUserRepository } from '../../../src/domain/repositories/user-repository.interface';
import { AuthUseCase } from '../../../src/domain/usecases/authentication/auth-usecase';
import { mockAuthenticationParams } from '../../mocks/mock-account';
import { makeUserRepository } from '../../mocks/repositories/mock-user.repository';

type SutType = {
  sut: AuthUseCase;
  repositoryStub: IUserRepository;
};

const makeSut = (): SutType => {
  const repositoryStub = makeUserRepository();
  const sut = new AuthUseCase(repositoryStub);

  return {
    sut,
    repositoryStub,
  };
};

describe('#UseCase auth', () => {
  it('Should call repository with correct values', async () => {
    const { repositoryStub, sut } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, 'findOneByEmail');
    const authParams = mockAuthenticationParams();
    sut.handle(authParams);
    expect(repositorySpy).toBeCalledWith(authParams.email);
  });

  it('Should return null if email not exists', async () => {
    const { repositoryStub, sut } = makeSut();

    jest
      .spyOn(repositoryStub, 'findOneByEmail')
      .mockImplementationOnce(() => null);

    const received = await sut.handle(mockAuthenticationParams());

    expect(received).toBeNull();
  });
});
