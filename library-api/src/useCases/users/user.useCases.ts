import { Injectable } from '@nestjs/common';
import { MissingParamError } from 'library-api/src/common/errors';
import { UserId } from 'library-api/src/entities';
// import { MissingParamError } from 'library-api/src/common/errors';
// import { UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories';
import { PlainUserUseCasesOutput } from 'library-api/src/useCases/users/user.useCases.type';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllPlain(): Promise<PlainUserUseCasesOutput[]> {
    return this.userRepository.getAllPlain();
  }

  public async create(
    firstName: string,
    lastName: string,
  ): Promise<PlainUserUseCasesOutput> {
    return this.userRepository.createUser(firstName, lastName);
  }

  /**
   * Delete a user
   * @param id User ID
   */
  public async delete(id: string): Promise<void> {
    if (!id) {
      throw new MissingParamError('id');
    }

    await this.userRepository.deleteUser(id);
  }

  public async getById(id: UserId): Promise<PlainUserUseCasesOutput> {
    if (!id) {
      throw new MissingParamError('id');
    }

    return this.userRepository.getById(id);
  }
}
