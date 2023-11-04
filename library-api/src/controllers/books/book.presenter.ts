import { ApiProperty } from '@nestjs/swagger';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';

export class PlainBookPresenter {
  @ApiProperty()
  id: BookId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  writtenOn: Date;

  @ApiProperty()
  author: PlainAuthorPresenter;

  @ApiProperty()
  genres: string[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
    });
  }
}

export class BookPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  author: PlainAuthorPresenter;

  @ApiProperty()
  writtenOn: Date;

  @ApiProperty()
  genres: GenrePresenter[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
      genres: data.genres.map(GenrePresenter.from),
    });
  }
}
