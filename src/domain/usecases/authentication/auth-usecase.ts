import { IUserRepository } from '../../repositories/user-repository.interface';
import { IUseCase } from '../usecase.interface';

type AuthUseCaseDto = {
  email: string;
  password: string;
};

export class AuthUseCase implements IUseCase {
  constructor(private readonly repository: IUserRepository) {}

  /* eslint-disable no-unused-vars */
  async handle({ email, password }: AuthUseCaseDto): Promise<string | null> {
    const user = await this.repository.findOneByEmail(email);
  }
}
