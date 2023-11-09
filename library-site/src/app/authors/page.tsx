'use client';
import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PlainAuthorPresenter } from '../../../../library-api/src/controllers/authors/author.presenter';
import { useDisclosure } from '@/hooks';
import { Button } from '@/components/button';
import { CreateAuthorModal } from "./create-author-modal";
import { AuthorWithBookCount } from "./author-with-book-count";

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<AuthorWithBookCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAuthorsWithBookCount = async () => {
      setLoading(true);
      try {
        // 1. Obtenez tous les livres.
        const booksResponse = await axios.get('http://localhost:3001/books');
        const allBooks = booksResponse.data;
        console.log(allBooks);
        // 2. Créez un objet pour compter les livres de chaque auteur.
        const bookCountByAuthor: { [key: string]: number } = {};

        // 3. Parcourez tous les livres et augmentez le compte pour chaque authorId.
        allBooks.forEach((book: { author: { id: string } }) => {
          const authorId = book.author.id;
          if (bookCountByAuthor[authorId]) {
            bookCountByAuthor[authorId]++;
          } else {
            bookCountByAuthor[authorId] = 1;
          }
        });

        // Obtenez tous les auteurs.
        const authorsResponse = await axios.get(
          'http://localhost:3001/authors',
        );
        const authorData = authorsResponse.data;

        // 4. Mettez à jour les auteurs avec le compte des livres.
        const authorsWithBookCounts = authorData.map(
          (author: PlainAuthorPresenter) => {
            return { ...author, bookCount: bookCountByAuthor[author.id] || 0 };
          },
        );
        setAuthors(authorsWithBookCounts);
        setLoading(false);
      } catch (e) {
        setError((e as AxiosError).message);
        setLoading(false);
      }
    };

    loadAuthorsWithBookCount();
  }, []);

  const deleteAuthor = async (Id: string) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${Id}`);
      const updatedAuthors = authors.filter((author) => author.id !== Id);
      setAuthors(updatedAuthors);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  return (
    <div>
      <div className="m-10">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
          Liste des auteurs
        </h1>

        {loading && <p className="text-gray-600 text-center">Chargement...</p>}
        {error && (
          <p className="text-red-600 text-center">{`Erreur : ${error}`}</p>
        )}

        <div className="flex justify-end mb-4">
          <Button onClick={openModal} color="primary">
            Créer un auteur
          </Button>
          <CreateAuthorModal isOpen={isModalOpen} onClose={closeModal} />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un auteur..."
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {authors
            .filter((author) => {
              if (!searchTerm) return true;
              const fullName =
                `${author.firstName} ${author.lastName}`.toLowerCase();
              return fullName.includes(searchTerm.toLowerCase());
            })
            .map((author) => (
              <li key={author.id} className="bg-white shadow-lg rounded-lg">
                <img
                  src={`https://${
                    author.photoUrl ||
                    'uploads-ssl.webflow.com/611273e5b99302da68352039/6231e94a41b356332fe08549_la-biographie-de-la-semaine-les-mots-par-jean-paul-sartre-main.jpeg'
                  }`}
                  alt={`${author.firstName} ${author.lastName}`}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-center">
                    {`${author.firstName} ${author.lastName} (${
                      author.bookCount
                    } ${author.bookCount > 1 ? 'livres' : 'livre'})`}
                  </h2>

                  <Button
                    onClick={() => deleteAuthor(author.id)}
                    color="red"
                    variant="outline"
                  >
                    Supprimer
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorsPage;
