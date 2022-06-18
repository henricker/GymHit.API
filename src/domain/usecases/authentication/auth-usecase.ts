import { IUserRepository } from '../../repositories/user-repository.interface';
import { IEncrypter } from '../../services/encrypter.service';
import { IHashComparer } from '../../services/hash-compare.service';
import { IUseCase } from '../usecase.interface';
import { IAuthParams } from './auth-params.dto';

export class AuthUseCase implements IUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly hashCompare: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}

  /* eslint-disable no-unused-vars */
  async handle({ email, password }: IAuthParams): Promise<string | null> {
    const user = await this.repository.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const compare = await this.hashCompare.compare(password, user.password);

    if (!compare) {
      return null;
    }

    const accessToken = await this.encrypter.sign(user.id);

    console.log(accessToken);
    return accessToken;
  }
}
