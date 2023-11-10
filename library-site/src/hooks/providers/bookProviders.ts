import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => {
        throw new Error(err);
      });
  };

  return { books, load: fetchBooks };
};

type UseBookActionsProvider = {
  createBook: ({
    authorId,
    title,
  }: {
    authorId: string;
    title: string;
  }) => Promise<unknown>;
};

export const useBookActions = (): UseBookActionsProvider => {
  const createBook = ({
    authorId,
    title,
  }: {
    authorId: string;
    title: string;
  }): Promise<unknown> => {
    const params = {
      authorId,
      title,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/books`, null, { params })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  };

  return { createBook };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
  useBookActions: () => UseBookActionsProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
  useBookActions,
});
