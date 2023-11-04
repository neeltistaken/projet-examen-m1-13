import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from './User';
import { Review } from './Comment';
import { UserBook } from './UserBook';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './Comment';
export * from './UserBook';

export const entities = [
  Author,
  Book,
  BookGenre,
  Genre,
  User,
  Review,
  UserBook,
];
