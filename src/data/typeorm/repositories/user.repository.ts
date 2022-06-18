import { EntityRepository, Repository } from "typeorm";
import { IUser } from "../../../domain/entities/user.interface";
import { IUserRepository } from "../../../domain/repositories/user-repository.interface";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  findOneByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ where: { email } });
  }
}
