import { IUserRepository } from "../../repositories/user-repository.interface";
import { IUseCase } from "../usecase.interface";
import { IAuthParams } from "./auth-params.dto";

export class AuthUseCase implements IUseCase {
  constructor(private readonly repository: IUserRepository) {}

  /* eslint-disable no-unused-vars */
  async handle({ email, password }: IAuthParams): Promise<string | null> {
    const user = await this.repository.findOneByEmail(email);

    if (!user) {
      return null;
    }

    return "access_token";
  }
}
