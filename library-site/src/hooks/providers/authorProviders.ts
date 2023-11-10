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

  const fetchBooks = () => {
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

  const fetchAuthor = (id: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((response) => setAuthor(response.data))
      .catch((err) => setError(err));
  };

  return { author, error, load: fetchAuthor };
};

export const useAuthorActions = () => {
  const deleteAuthor = (authorId: string) =>
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`);

  return { deleteAuthor };
};
