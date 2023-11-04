import { Book, UserId, Review } from 'library-api/src/entities';
import { PlainUserModel } from 'library-api/src/models/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class PlainUserPresenter {
  @ApiProperty()
  id: UserId;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  review?: Review[];

  @ApiProperty()
  books?: Book[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      review: data.review,
      books: data.books,
    });
  }
}
