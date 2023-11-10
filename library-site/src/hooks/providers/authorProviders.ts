import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[] | null;
  error: AxiosError | null;
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[] | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((response) => setAuthors(response.data))
      .catch((err) => setError(err));
  };

  return { authors, error, load: fetchBooks };
};

type UseGetAuthorProvider = {
  author: PlainAuthorModel | null;
  error: AxiosError | null;
  load: (id: string) => void;
};

export const useGetAuthor = (): UseGetAuthorProvider => {
  const [author, setAuthor] = useState<PlainAuthorModel | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchAuthor = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((response) => setAuthor(response.data))
      .catch((err) => setError(err));
  };

  return { author, error, load: fetchAuthor };
};

type UseAuthorActionsReturn = {
  deleteAuthor: (authorId: string) => Promise<unknown>;
  createAuthor: ({
    firstName,
    lastName,
    photoUrl,
  }: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  }) => Promise<unknown>;
};

export const useAuthorActions = (): UseAuthorActionsReturn => {
  // conflict between eslint and prettier
  // eslint-disable-next-line arrow-body-style
  const deleteAuthor = (authorId: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  };

  const createAuthor = async ({
    firstName,
    lastName,
    photoUrl,
  }: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  }): Promise<unknown> => {
    const params = {
      firstName,
      lastName,
      photoUrl,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, null, {
          params,
        })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  };

  return { deleteAuthor, createAuthor };
};
