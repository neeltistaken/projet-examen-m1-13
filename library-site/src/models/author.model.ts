export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  books: {
    id: string;
    name: string;
    writtenOn: string;
    genres: {
      id: string;
    }[];
  }[];
};
