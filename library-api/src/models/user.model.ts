import { Book, UserId, Review } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  review?: Review[];
  books?: Book[];
};
