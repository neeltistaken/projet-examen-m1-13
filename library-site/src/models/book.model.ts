export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
  };
};
