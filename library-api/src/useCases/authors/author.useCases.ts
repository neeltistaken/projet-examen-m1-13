import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import { PlainAuthorUseCasesOutput } from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all authors
   * @returns Array of authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get an author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create an empty author
   * @returns Empty author
   */
  public async createEmpty(): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.createEmpty();
  }

  /**
   * Create an author
   * @param firstName Author's first name
   * @param lastName Author's last name
   * @param photoUrl Author's photo URL
   * @returns Created author
   */
  public async create(
    firstName: string,
    lastName: string,
    photoUrl: string,
  ): Promise<PlainAuthorUseCasesOutput> {
    const author = await this.authorRepository.createEmpty(); // Create an empty author

    author.firstName = firstName;
    author.lastName = lastName;
    author.photoUrl = photoUrl;
    return this.authorRepository.save(author);
  }
}
