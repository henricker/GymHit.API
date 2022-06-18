import { faker } from '@faker-js/faker';
import { IUser } from '../../src/domain/entities/user.interface';
import { IAuthParams } from '../../src/domain/usecases/authentication/auth-params.dto';

export const mockAuthenticationParams = (): IAuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockFakeUserAccount = (): IUser => ({
  id: Number(faker.random.numeric()),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
