import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { PlainAuthorRepositoryOutput } from './author.repository.type';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<Author[]> {
    return this.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .getMany();
  }

  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .where('author.id = :id', { id })
      .getOne();

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return author;
  }

  public async createEmpty(): Promise<Author> {
    const newAuthor = new Author();
    newAuthor.firstName = '';
    newAuthor.lastName = '';
    newAuthor.photoUrl = 'https://placehold.co/300';
    return this.save(newAuthor);
  }
}
