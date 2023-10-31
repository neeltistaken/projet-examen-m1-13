'use client';

import React, { FC, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '../../models/author.model';
import Navbar from "@/app/NavBar";

const AuthorsPage: FC = () => {
  // Initialisation de l'état des auteurs à un tableau vide
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  // Initialisation de l'état de chargement à false
  const [loading, setLoading] = useState(false);

  // Initialisation de l'état d'erreur à null
  const [error, setError] = useState(null);

  useEffect(() => {
    // Définir l'état de chargement à true avant de faire l'appel à l'API
    setLoading(true);

    axios
      .get('http://localhost:3001/authors')
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

    return (
      <div>
        <Navbar current_page="Auteurs" />
        <h1>Liste des auteurs</h1>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              {`${author.firstName} ${author.lastName}`}
              <img
                src={author.photoUrl}
                alt={`${author.firstName} ${author.lastName}`}
                className="w-72 h-72 rounded-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};
export default AuthorsPage;
