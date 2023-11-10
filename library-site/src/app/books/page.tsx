'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">Livres</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Titre</th>
            <th className="border px-4 py-2">Auteur</th>
            <th className="border px-4 py-2">Date de publication</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.name}</td>
              <td className="border px-4 py-2">
                {book.author.firstName} {book.author.lastName}
              </td>
              <td className="border px-4 py-2">{book.writtenOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BooksPage;
