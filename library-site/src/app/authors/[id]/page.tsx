'use client';

import React, { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDisclosure, useGetAuthor } from '@/hooks';
import { Button } from '@/components/button';
import { DeleteAuthorModal } from '@/app/authors/[id]/delete-author-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AuthorDetailsPage: FC = () => {
  const { id: authorId } = useParams();
  const {
    isOpen: isDeteleModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const { author, error, load } = useGetAuthor();
  useEffect(() => load(authorId as string), []);

  if (error) {
    return <p>{`Erreur : ${error.message}`}</p>;
  } else if (!author) {
    return (
      <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
        Chargement...
      </h1>
    );
  } else
    return (
      <>
        <h1 className="text-3xl font-bold mb-8 mt-10 text-center">
          {author.firstName} {author.lastName}
        </h1>
        <div className="flex justify-center flex-wrap xs:gap-10">
          <img
            src={`https://${author.photoUrl}`}
            alt={`Photo de ${author.firstName} ${author.lastName}`}
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
              <p>Aucun livre n'a été trouvé pour cet auteur.</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button onClick={openDeleteModal} color="red" variant="outline">
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Supprimer l'auteur
          </Button>
          <DeleteAuthorModal
            authorId={authorId as string}
            authorName={`${author.firstName} ${author.lastName}`}
            isOpen={isDeteleModalOpen}
            onClose={closeDeleteModal}
          />
        </div>
      </>
    );
};

export default AuthorDetailsPage;
