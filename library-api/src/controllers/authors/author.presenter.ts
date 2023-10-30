import { AuthorId } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models';
// import { PlainBookPresenter } from '../books/book.presenter';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
    });
  }
}
