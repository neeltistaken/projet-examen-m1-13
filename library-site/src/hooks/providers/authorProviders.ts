import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[] | null;
  error: string;
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[] | null>(null);
  const [error, setError] = useState<string>('');

  const fetchBooks = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((response) => setAuthors(response.data))
      .catch((err) => setError(err))
  };

  return { authors, error, load: fetchBooks };
};
