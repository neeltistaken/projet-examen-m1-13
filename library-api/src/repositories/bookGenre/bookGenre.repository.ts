import { Injectable } from '@nestjs/common';
// import { NotFoundError } from 'library-api/src/common/errors';
// import { NotFoundError } from 'library-api/src/common/errors';
import {
  Book,
  BookGenre,
  BookId,
  Genre,
  GenreId,
} from 'library-api/src/entities';
import { BookGenreRepositoryOutput } from 'library-api/src/repositories/bookGenre/bookGenre.repository.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BookGenreRepository extends Repository<BookGenre> {
  constructor(public readonly dataSource: DataSource) {
    super(BookGenre, dataSource.createEntityManager());
  }

  /**
   * Get all book genres
   * @returns Array of book genres
   */
  public async getAll(): Promise<BookGenreRepositoryOutput[]> {
    const bookGenres = await this.find({
      relations: { genre: true, book: true },
    });

    return bookGenres;
  }

  //   /**
  //    * Get all genres of a book
  //    * @param bookId Book's ID
  //    * @returns Array of genres
  //    * @throws 404: book with this ID was not found
  //    * @throws 404: book has no genres
  //    */
  //   public async getGenresOfBook(
  //     bookId: BookId,
  //   ): Promise<BookGenreRepositoryOutput[]> {
  //     const book = new Book();
  //     book.id = bookId;

  //     const bookGenres = await this.find({
  //       where: { book: bookId },
  //       relations: { genre: true, book: true },
  //     });

  //     if (!bookGenres) {
  //       throw new NotFoundError(`Book - '${bookId}'`);
  //     }

  //     return bookGenres;
  //   }

  /**
   * Add a genre to a book
   * @param bookId Book's ID
   * @param genreId Genre's ID
   * @returns Book genre
   */
  public async addGenreToBook(
    bookId: BookId,
    genreId: GenreId,
  ): Promise<BookGenreRepositoryOutput> {
    const bookGenre = new BookGenre();

    const book = new Book();
    book.id = bookId;

    const genre = new Genre();
    genre.id = genreId;

    bookGenre.book = book;
    bookGenre.genre = genre;

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(BookGenre)
      .values(bookGenre)
      .execute();

    return bookGenre;
  }
}
