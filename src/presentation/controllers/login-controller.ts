import { AuthUseCase } from "../../domain/usecases/authentication/auth-usecase";
import { IUseCase } from "../../domain/usecases/usecase.interface";
import { badRequest, ok, serverError, unauthorized } from "../helpers/http-helpers";
import { IController, IHttpRequest, IHttpResponse, IValidation } from "../protocols";

export class LoginController implements IController {
    constructor(
        private validation: IValidation,
        private authUseCase: IUseCase
    ) {}

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(request.body);

            if(error) {
                return badRequest(error)
            }

            const access_token = await this.authUseCase.handle({ email: request.body.email, password: request.body.password })

            if(!access_token) {
                return unauthorized()
            }
    
            return ok({
                access_token
            })
        } catch(err) {
            return serverError(err);
        }
    }
}