import { Injectable } from '@nestjs/common';
import { MissingParamError } from 'library-api/src/common/errors';
import { BookId, GenreId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import { BookGenreRepository } from 'library-api/src/repositories/bookGenre/bookGenre.repository';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookGenreRepository: BookGenreRepository,
  ) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a book
   * @param title Book's title
   * @param authorId Book's author ID
   * @returns Created book
   */
  public async create(
    title: string,
    authorId: string,
  ): Promise<BookUseCasesOutput> {
    if (!title) {
      throw new MissingParamError('Missing title');
    }

    if (!authorId) {
      throw new MissingParamError('Missing author ID');
    }

    return this.bookRepository.createBook(title, authorId);
  }

  /**
   * Update a book
   * @param id Book's ID
   * @param title Book's title
   * @param authorId Book's author ID
   * @returns Updated book
   */
  public async update(
    id: BookId,
    title: string,
    authorId: string,
  ): Promise<BookUseCasesOutput> {
    if (!id) {
      throw new MissingParamError('Missing ID');
    }

    if (!title) {
      throw new MissingParamError('Missing title');
    }

    if (!authorId) {
      throw new MissingParamError('Missing author ID');
    }

    return this.bookRepository.updateBook(id, title, authorId);
  }

  /**
   * Delete a book
   * @param id Book's ID
   * @returns Deleted book
   */
  public async delete(id: BookId): Promise<BookUseCasesOutput> {
    if (!id) {
      throw new MissingParamError('Missing ID');
    }

    return this.bookRepository.deleteBook(id);
  }

  /**
   * Add a book genre
   * @param id Book's ID
   * @param genreId Genre's ID
   * @returns Updated book
   */
  public async addGenre(
    id: BookId,
    genreId: GenreId,
  ): Promise<BookUseCasesOutput> {
    if (!id) {
      throw new MissingParamError('Missing ID');
    }

    if (!genreId) {
      throw new MissingParamError('Missing genre ID');
    }

    this.bookGenreRepository.addGenreToBook(id, genreId);

    return this.bookRepository.getById(id);
  }
}
