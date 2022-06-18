import { IUser } from '../../../src/domain/entities/user.interface';
import { IUserRepository } from '../../../src/domain/repositories/user-repository.interface';
import { AuthUseCase } from '../../../src/domain/usecases/authentication/auth-usecase';
import {
  mockAuthenticationParams,
  mockFakeUserAccount,
} from '../../mocks/mock-account';

type SutType = {
  sut: AuthUseCase;
  repositoryStub: IUserRepository;
};

const makeRepository = (): IUserRepository => {
  class RepositoryStub implements IUserRepository {
    async findOneByEmail(email: string): Promise<IUser> {
      return mockFakeUserAccount();
    }
  }

  return new RepositoryStub();
};

const makeSut = (): SutType => {
  const repositoryStub = makeRepository();
  const sut = new AuthUseCase(repositoryStub);

  return {
    sut,
    repositoryStub,
  };
};

const makeFakeLogin = (): { email: string; password: string } =>
  mockAuthenticationParams();

describe('#UseCase auth', () => {
  it('Should call repository with correct values', async () => {
    const { repositoryStub, sut } = makeSut();
    const repositorySpy = jest.spyOn(repositoryStub, 'findOneByEmail');
    const authParams = mockAuthenticationParams();
    sut.handle(authParams);
    expect(repositorySpy).toBeCalledWith(authParams.email);
  });
});
