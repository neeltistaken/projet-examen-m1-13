import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
// import { MissingParamError } from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
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

  public async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  public async getById(id: UserId): Promise<PlainUserRepositoryOutput> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return user;
  }
}
