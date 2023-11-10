import { AuthorId, Book } from 'library-api/src/entities';
// import { BookModel } from 'library-api/src/models/book.model';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books?: Book[];
};
