import { PlainAuthorPresenter } from "../../../../library-api/src/controllers/authors/author.presenter";

export type AuthorWithBookCount = PlainAuthorPresenter & { bookCount: number };