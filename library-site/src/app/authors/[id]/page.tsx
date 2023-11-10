'use client';

import React, { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetAuthor } from '@/hooks';

const AuthorDetailsPage: FC = () => {
  const { id: authorId } = useParams();

  const { author, error, load } = useGetAuthor();
  useEffect(() => load(authorId as string), []);

  if (error) {
    return <p>{`Erreur : ${error.message}`}</p>;
  } else if (!author) {
    return <p>Chargement...</p>;
  } else
    return (
      <>
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
          {author.firstName} {author.lastName}
        </h1>
        <img
          src={`https://${author.photoUrl}`}
          alt={`Photo de ${author.firstName} ${author.lastName}`}
          className="w-72 h-72 rounded-full object-cover"
        />
      </>
    );
};

export default AuthorDetailsPage;
