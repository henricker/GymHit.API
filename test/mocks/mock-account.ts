import { IAuthParams } from "../../src/domain/usecases/authentication/auth-params.dto";
import { faker } from '@faker-js/faker'


export const mockAuthenticationParams = (): IAuthParams => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}