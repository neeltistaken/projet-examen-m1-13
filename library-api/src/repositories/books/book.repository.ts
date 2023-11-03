import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Book, BookId } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { author: true, bookGenres: { genre: true } },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Create a book
   * @param title Book's title
   * @param authorId Book's author ID
   * @returns Created book
   */
  public async createBook(title, authorId): Promise<BookRepositoryOutput> {
    const book = new Book();
    book.name = title;
    book.author = authorId;
    book.writtenOn = new Date();
    book.bookGenres = [];

    return adaptBookEntityToBookModel(await this.save(book));
  }

  /**
   * Update a book
   * @param id Book's ID
   * @param title Book's title
   * @param authorId Book's author ID
   * @returns Updated book
   */
  public async updateBook(
    id: BookId,
    title: string,
    authorId: string,
  ): Promise<BookRepositoryOutput> {
    // Change the book's title
    await this.update(id, { name: title, author: { id: authorId } });

    return this.getById(id);
  }
}
