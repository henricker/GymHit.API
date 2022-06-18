import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../../data/typeorm/repositories/user.repository";
import { AuthUseCase } from "../../../domain/usecases/authentication/auth-usecase";
import { BcryptAdapter } from "../../adapters/bcrypt/bcrypt-adapter";
import { JwtAdapter } from "../../adapters/jwt/jwt-adapter";

export const LoginUseCaseFactory = (): AuthUseCase => {
  const repository = getCustomRepository(UserRepository);
  const hash = new BcryptAdapter(12);
  const encrypter = new JwtAdapter(process.env.SECRET_KEY);
  return new AuthUseCase(repository, hash, encrypter);
};
