import { AuthorId, Book } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  books?: Book[];

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      books: data.books,
    });
  }
}
