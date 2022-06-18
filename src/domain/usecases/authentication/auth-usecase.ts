import { IUserRepository } from "../../repositories/user-repository.interface";
import { IJwt } from "../../services/encrypter.service";
import { IHash } from "../../services/hash-compare.service";
import { IUseCase } from "../usecase.interface";
import { IAuthParams } from "./auth-params.dto";

export class AuthUseCase implements IUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly hashCompare: IHash,
    private readonly encrypter: IJwt
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
