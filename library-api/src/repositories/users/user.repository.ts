import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
// import { MissingParamError } from 'library-api/src/common/errors';
import { User } from 'library-api/src/entities';
// import { PlainUserModel } from 'library-api/src/models';
import { PlainUserRepositoryOutput } from './user.repository.type';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    return this.createQueryBuilder('user').getMany();
  }

  public async createUser(
    firstName: string,
    lastName: string,
  ): Promise<PlainUserRepositoryOutput> {
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;

    return this.save(user);
  }
}
