import { IUser } from "../../../src/domain/entities/user.interface";
import { IUserRepository } from "../../../src/domain/repositories/user-repository.interface";
import { mockFakeUserAccount } from "../mock-account";


export const makeUserRepository = (): IUserRepository => {
    class RepositoryStub implements IUserRepository {
      async findOneByEmail(email: string): Promise<IUser | null> {
        return mockFakeUserAccount();
      }
    }
  
    return new RepositoryStub();
  };