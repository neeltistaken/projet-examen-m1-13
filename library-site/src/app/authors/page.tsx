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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthorData, setNewAuthorData] = useState<CreateAuthorData>({
    firstName: '',
    lastName: '',
    photoUrl: '',
  });
  const [selectedAuthor, setSelectedAuthor] = useState<PlainAuthorPresenter | null>(null);

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

  const openModal = (author?: PlainAuthorPresenter) => {
    if (author) {
      setSelectedAuthor(author);
      setNewAuthorData({
        firstName: author.firstName,
        lastName: author.lastName,
        photoUrl: author.photoUrl ?? '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);  // Reset selected author when modal closes
    setNewAuthorData({       // Reset form data
      firstName: '',
      lastName: '',
      photoUrl: '',
    });
  };

  const handleAuthorFormSubmit = async () => {
    if (selectedAuthor) {
      await updateAuthor(selectedAuthor.id, newAuthorData);
    } else {
      await createAuthor();
    }
    closeModal();
  };

  const createAuthor = async () => {
    try {
      const params = {
        firstName: newAuthorData.firstName,
        lastName: newAuthorData.lastName,
        photoUrl: newAuthorData.photoUrl
      };
      
      const response = await axios.post('http://localhost:3001/authors', null, { params });
      
      const createdAuthor = {
        ...newAuthorData,
        id: response.data.id
      };
      setAuthors(prev => [...prev, createdAuthor]);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };
  

  const updateAuthor = async (authorId: string, updatedAuthorData: CreateAuthorData) => {
    try {
      const response = await axios.put(`http://localhost:3001/authors/${authorId}`, updatedAuthorData);
      const updatedAuthors = authors.map((author) =>
        author.id === authorId ? { ...author, ...response.data } : author
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
          onClick={() => openModal()}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 mr-2"
        >
          Créer un auteur
        </button>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {authors.map((author) => (
            <li key={author.id} className="bg-white shadow-lg rounded-lg">
              <img
                src={`https://${author.photoUrl || 'uploads-ssl.webflow.com/611273e5b99302da68352039/6231e94a41b356332fe08549_la-biographie-de-la-semaine-les-mots-par-jean-paul-sartre-main.jpeg'}`}
                alt={`${author.firstName} ${author.lastName}`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-center">{`${author.firstName} ${author.lastName}`}</h2>
                <button
                  onClick={() => openModal(author)}
                  className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for creating/editing an author */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Author Modal"
        appElement={document.getElementById('root') || undefined}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">
          {selectedAuthor ? 'Modifier un auteur' : 'Créer un nouvel auteur'}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold">Prénom:</label>
            <input
              type="text"
              value={newAuthorData.firstName}
              onChange={(e) => setNewAuthorData((prev) => ({ ...prev, firstName: e.target.value }))}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Nom de famille:</label>
            <input
              type="text"
              value={newAuthorData.lastName}
              onChange={(e) => setNewAuthorData((prev) => ({ ...prev, lastName: e.target.value }))}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">URL de la photo:</label>
            <input
              type="text"
              value={newAuthorData.photoUrl}
              onChange={(e) => setNewAuthorData((prev) => ({ ...prev, photoUrl: e.target.value }))}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleAuthorFormSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 mr-2"
          >
            {selectedAuthor ? 'Mettre à jour' : 'Créer'}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-700"
          >
            Annuler
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AuthorsPage;
