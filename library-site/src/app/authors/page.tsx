'use client';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { PlainAuthorModel } from '../../models/author.model';
import Navbar from "@/app/NavBar";

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:3001/authors')
      .then((response) => {
        setAuthors(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar current_page="Auteurs" />
      <div className="m-10">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">Liste des auteurs</h1>

        {loading && <p className="text-gray-600 text-center">Chargement...</p>}
        {error && <p className="text-red-600 text-center">{`Erreur : ${error}`}</p>}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {authors.map((author) => (
            <li key={author.id} className="bg-white shadow-lg rounded-lg">
              <img
                src={`https://${author.photoUrl}`} 
                alt={`${author.firstName} ${author.lastName}`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{`${author.firstName} ${author.lastName}`}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorsPage;
