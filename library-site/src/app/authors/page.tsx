'use client';
import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PlainAuthorPresenter } from '../../../../library-api/src/controllers/authors/author.presenter';
import Navbar from '@/app/NavBar';
import Modal from 'react-modal';

type CreateAuthorData = {
  firstName: string;
  lastName: string;
  photoUrl: string;
};

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<PlainAuthorPresenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State pour la fenêtre modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthorData, setNewAuthorData] = useState<CreateAuthorData>({
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  useEffect(() => {
    const loadAuthors = async () => {
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:3001/authors');
        setAuthors(response.data);
        setLoading(false);
      } catch (e) {
        setError((e as AxiosError).message);
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createAuthor = async () => {
    console.log('Création d\'un nouvel auteur');
    try {
      const response = await axios.post('http://localhost:3001/authors', newAuthorData);
      console.log('Données renvoyées par l\'API :', response.data);

      setAuthors([...authors, response.data]);
      closeModal();
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  const updateAuthor = async (authorId: string, updatedAuthorData: CreateAuthorData) => {
    try {
      const response = await axios.put(`http://localhost:3001/authors/${authorId}`, updatedAuthorData);
      const updatedAuthors = authors.map((author) =>
        author.id === authorId ? response.data : author
      );
      setAuthors(updatedAuthors);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  const deleteAuthor = async (authorId: string) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${authorId}`);
      const updatedAuthors = authors.filter((author) => author.id !== authorId);
      setAuthors(updatedAuthors);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  return (
    <div>
      <Navbar currentPage="Auteurs" />
      <div className="m-10">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">Liste des auteurs</h1>

        {loading && <p className="text-gray-600 text-center">Chargement...</p>}
        {error && <p className="text-red-600 text-center">{`Erreur : ${error}`}</p>}

        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 mr-2"
        >
          Créer un auteur
        </button>

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
                <button
                  onClick={() => {
                    // Ouvrir la fenêtre modale de mise à jour ici
                  }}
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover-bg-blue-700 mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full hover-bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fenêtre modale pour la création d'auteur */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Créer un auteur"
        appElement={document.getElementById('root') || undefined}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Créer un nouvel auteur</h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold">Prénom:</label>
            <input
              type="text"
              value={newAuthorData.firstName}
              onChange={(e) =>
                setNewAuthorData({ ...newAuthorData, firstName: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Nom:</label>
            <input
              type="text"
              value={newAuthorData.lastName}
              onChange={(e) =>
                setNewAuthorData({ ...newAuthorData, lastName: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">URL de la photo:</label>
            <input
              type="text"
              value={newAuthorData.photoUrl}
              onChange={(e) =>
                setNewAuthorData({ ...newAuthorData, photoUrl: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={createAuthor}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 mr-2"
          >
            Créer
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-400"
          >
            Annuler
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default AuthorsPage;
