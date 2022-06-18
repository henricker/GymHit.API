import { IUseCase } from '../usecase.interface';

type AuthUseCaseDto = {
  email: string;
  password: string;
};

export class AuthUseCase implements IUseCase {
  /* eslint-disable no-unused-vars */
  handle({ email, password }: AuthUseCaseDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
