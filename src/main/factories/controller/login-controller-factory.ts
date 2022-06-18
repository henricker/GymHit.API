import { LoginController } from "../../../presentation/controllers/login-controller";
import { IController } from "../../../presentation/protocols";
import { LoginUseCaseFactory } from "../usecase/login-usecase-factory";

export const makeLoginController = (): IController => {
  const useCase = LoginUseCaseFactory();
  const controller = new LoginController();
};
