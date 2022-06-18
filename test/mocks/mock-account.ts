import { faker } from '@faker-js/faker';
import { IAuthParams } from '../../src/domain/usecases/authentication/auth-params.dto';

export const mockAuthenticationParams = (): IAuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
