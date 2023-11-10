'use client';

import React, { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure, useGetAuthor } from '@/hooks';
import { Button } from '@/components/button';
import { DeleteAuthorModal } from '@/app/authors/[id]/delete-author-modal';
import { CreateBookModal } from '@/app/authors/[id]/create-book-modal';

const AuthorDetailsPage: FC = () => {
  const { id: authorId } = useParams();
  const {
    isOpen: isDeteleModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isCreateBookModalOpen,
    onOpen: openCreateBookModal,
    onClose: closeCreateBookModal,
  } = useDisclosure();

  const { author, error, load } = useGetAuthor();
  // we know that load fct will not change (and adding it to the array create an infinite loop)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => load(authorId as string), [authorId]);

  if (error) {
    return <p>{`Erreur : ${error.message}`}</p>;
  }
  if (!author) {
    return (
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
        Chargement...
      </h1>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 mt-10 text-center">
        {/* disable line return rule otherwise prettier will do the opposite */}
        {/* eslint-disable-next-line */}
        {author.firstName} {author.lastName}
      </h1>
      <div className="flex justify-center flex-wrap xs:gap-10">
        <img
          src={`https://${author.photoUrl}`}
          alt={`${author.firstName} ${author.lastName}`}
          className="w-48 h-48 sm:w-72 sm:h-72 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold mb-4 mt-5">Livres</h2>
          {author.books?.length ? (
            <ul className="list-disc list-inside">
              {author.books.map((book) => (
                <li key={book.id}>{book.name}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun livre n&apos;a été trouvé pour cet auteur.</p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-5">
        <Button onClick={openDeleteModal} color="red" variant="outline">
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Supprimer l&apos;auteur
        </Button>
        <DeleteAuthorModal
          authorId={authorId as string}
          authorName={`${author.firstName} ${author.lastName}`}
          isOpen={isDeteleModalOpen}
          onClose={closeDeleteModal}
        />
        <Button onClick={openCreateBookModal} color="primary">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Ajouter un livre
        </Button>
        <CreateBookModal
          authorId={authorId as string}
          isOpen={isCreateBookModalOpen}
          onClose={closeCreateBookModal}
          refreshAuthor={(): void => load(authorId as string)}
        />
      </div>
    </>
  );
};

export default AuthorDetailsPage;
