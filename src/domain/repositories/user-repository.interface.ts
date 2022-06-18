import { IUser } from '../entities/user.interface';

export interface IUserRepository {
  findOneByEmail(email: string): Promise<IUser>;
}
