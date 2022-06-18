import { IUseCase } from '../../domain/usecases/usecase.interface';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '../helpers/http-helpers';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '../protocols';

export class LoginController implements IController {
  /* eslint-disable no-empty-function */
  constructor(private validation: IValidation, private authUseCase: IUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const accessToken = await this.authUseCase.handle({
        email: request.body.email,
        password: request.body.password,
      });

      if (!accessToken) {
        return unauthorized();
      }

      return ok({
        accessToken,
      });
    } catch (err) {
      return serverError(err);
    }
  }
}
