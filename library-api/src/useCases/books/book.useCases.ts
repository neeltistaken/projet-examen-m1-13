import { Injectable } from '@nestjs/common';
import { MissingParamError } from 'library-api/src/common/errors';
import { BookId, GenreId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import { GenreRepository } from 'library-api/src/repositories/genres/genre.repository';
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
    private readonly genreRepository: GenreRepository,
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
   * Check if a book has a genre
   * @param id Book's ID
   * @param genreId Genre's ID
   * @returns True if the book has the genre
   */
  public async hasGenre(
    id: BookId,
    genreId: GenreId,
  ): Promise<boolean | undefined> {
    if (!id) {
      throw new MissingParamError('Missing ID');
    }

    if (!genreId) {
      throw new MissingParamError('Missing genre ID');
    }

    const book = await this.bookRepository.getById(id);

    return book.genres.some((genre) => genre.id === genreId);
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

    // Check if the id and genreId are valid
    await this.bookRepository.getById(id);
    await this.genreRepository.getById(genreId);

    // Check if the book already has the genre
    const hasGenre = await this.hasGenre(id, genreId);
    if (hasGenre) {
      return this.bookRepository.getById(id);
    }
    // Add the genre to the book
    this.bookGenreRepository.addGenreToBook(id, genreId);
    return this.bookRepository.getById(id);
  }

  /**
   * Remove a book genre
   * @param id Book's ID
   * @param genreId Genre's ID
   * @returns Updated book
   * @throws 404: book with this ID was not found
   */
  public async removeGenre(
    id: BookId,
    genreId: GenreId,
  ): Promise<BookUseCasesOutput> {
    if (!id) {
      throw new MissingParamError('Missing ID');
    }

    if (!genreId) {
      throw new MissingParamError('Missing genre ID');
    }

    // Check if the id and genreId are valid
    await this.bookRepository.getById(id);
    await this.genreRepository.getById(genreId);

    // Check if the book has the genre
    const hasGenre = await this.hasGenre(id, genreId);
    if (!hasGenre) {
      return this.bookRepository.getById(id);
    }
    // Remove the genre from the book
    this.bookGenreRepository.removeGenreFromBook(id, genreId);
    return this.bookRepository.getById(id);
  }
}
