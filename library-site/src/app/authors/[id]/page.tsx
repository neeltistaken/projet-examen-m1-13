'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { PlainAuthorModel } from '../../../models/author.model';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();

  // Initialisation de l'état des auteurs à un tableau vide
  const [author, setAuthors] = useState<PlainAuthorModel>();

  // Initialisation de l'état de chargement à false
  const [loading, setLoading] = useState(false);

  // Initialisation de l'état d'erreur à null
  const [error, setError] = useState(null);

  useEffect(() => {
    // Définir l'état de chargement à true avant de faire l'appel à l'API
    setLoading(true);

    axios
      .get(`http://localhost:3001/authors/${id}`)
      .then((response) => {
        // Mettre à jour l'état des auteurs avec les données récupérées
        setAuthors(response.data);

        // Définir l'état de chargement à false après la récupération des données
        setLoading(false);
      })
      .catch((e) => {
        // Gestion des erreurs
        setError(e);

        // Définir l'état de chargement à false en cas d'erreur
        setLoading(false);
      });
  }, []); // le tableau vide signifie que useEffect
  // ne s'exécutera qu'une fois après le premier rendu

  const renderContent = (): ReactElement => {
    if (loading) {
      return <p>Chargement...</p>;
    }

    if (error) {
      return <p>{`Erreur : ${error}`}</p>;
    }

    if (!author) {
      return <p>Aucun auteur trouvé</p>;
    }

    return (
      <div>
        <h1>
          Auteur :
          {`${author.firstName} 
        ${author.lastName}`}
        </h1>
        <img
          src={author.photoUrl}
          alt={`${author.firstName} ${author.lastName}`}
          className="w-72 h-72 rounded-full object-cover"
        />
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

export default AuthorDetailsPage;
