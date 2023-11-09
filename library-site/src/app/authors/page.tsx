'use client';
import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDisclosure, useListAuthors } from '@/hooks';
import { Button } from '@/components/button';
import { CreateAuthorModal } from './create-author-modal';
import { PlainAuthorModel } from '@/models';

const AuthorsPage: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedAuthors, setDisplayedAuthors] = useState<
    PlainAuthorModel[] | null
  >(null);

  const { authors, isLoading, load } = useListAuthors();

  const filterAuthors = () => {
    if (!authors) setDisplayedAuthors(null);
    else if (!searchTerm) setDisplayedAuthors(authors);
    else {
      const filteredAuthors = authors.filter((author) => {
        const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setDisplayedAuthors(filteredAuthors);
    }
  };

  useEffect(() => load(), []);
  useEffect(() => filterAuthors(), [authors, searchTerm]);

  const deleteAuthor = async (Id: string) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${Id}`);
      const updatedAuthors = authors.filter((author) => author.id !== Id);
      //setAuthors(updatedAuthors);
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

        {isLoading && (
          <p className="text-gray-600 text-center">Chargement...</p>
        )}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {displayedAuthors?.map((author) => (
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
                  {`${author.firstName} ${author.lastName} ${author.books?.length}`}
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
