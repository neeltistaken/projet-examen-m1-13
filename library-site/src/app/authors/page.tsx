'use client';

import React, { FC, useEffect, useState } from 'react';
import { useDisclosure, useListAuthors } from '@/hooks';
import { Button } from '@/components/button';
import { PlainAuthorModel } from '@/models';
import { AuthorCardSkeleton } from './author-card-skeleton';
import { AuthorCard } from './author-card';
import { CreateAuthorModal } from './create-author-modal';

const AuthorsPage: FC = () => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedAuthors, setDisplayedAuthors] = useState<
    PlainAuthorModel[] | null
  >(null);

  const { authors, error, load } = useListAuthors();

  useEffect(() => load(), []);

  // filter authors by search term on each search term change
  useEffect(() => {
    if (!authors) setDisplayedAuthors(null);
    else if (!searchTerm) setDisplayedAuthors(authors);
    else {
      const filteredAuthors = authors.filter((author) => {
        const fullName = `${author.firstName} ${author.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setDisplayedAuthors(filteredAuthors);
    }
  }, [authors, searchTerm]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
        Liste des auteurs
      </h1>

      {error && (
        <p className="text-red-600 text-center">{`Erreur : ${error.message}`}</p>
      )}

      <div className="flex justify-end mb-4">
        <Button onClick={openModal} color="primary">
          Créer un auteur
        </Button>
        <CreateAuthorModal
          isOpen={isModalOpen}
          onClose={closeModal}
          refreshAuthors={load}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e): void => setSearchTerm(e.target.value)}
          placeholder="Rechercher un auteur..."
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {!displayedAuthors && !error && (
        <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }, (_, index) => index).map((i) => (
            <AuthorCardSkeleton key={i} />
          ))}
        </ul>
      )}
      {displayedAuthors && (
        <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedAuthors?.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </ul>
      )}
    </>
  );
};

export default AuthorsPage;
