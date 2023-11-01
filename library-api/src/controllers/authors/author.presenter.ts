import { AuthorId, Book } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';

export class PlainAuthorPresenter {
  @ApiProperty()
  id: AuthorId;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  photoUrl?: string;

  @ApiProperty()
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
