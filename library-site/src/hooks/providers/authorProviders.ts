import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[] | null;
  isLoading: boolean;
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBooks = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((response) => setAuthors(response.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return { authors, isLoading, load: fetchBooks };
};
