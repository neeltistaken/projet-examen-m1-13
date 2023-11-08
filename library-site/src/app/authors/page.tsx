'use client';
import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PlainAuthorPresenter } from '../../../../library-api/src/controllers/authors/author.presenter';
import Navbar from '@/app/NavBar';
import { Modal } from '@/components/modal';
import { useDisclosure } from '@/hooks';
import { Button } from '@/components/button';

type CreateAuthorData = {
  firstName: string;
  lastName: string;
  photoUrl: string;
};

type AuthorWithBookCount = PlainAuthorPresenter & { bookCount: number };

const AuthorsPage: FC = () => {
  const [authors, setAuthors] = useState<AuthorWithBookCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [newAuthorData, setNewAuthorData] = useState<CreateAuthorData>({
    firstName: '',
    lastName: '',
    photoUrl: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAuthorsWithBookCount = async () => {
      setLoading(true);
      try {
        // 1. Obtenez tous les livres.
        const booksResponse = await axios.get('http://localhost:3001/books');
        const allBooks = booksResponse.data;
        console.log(allBooks);
        // 2. Créez un objet pour compter les livres de chaque auteur.
        const bookCountByAuthor: { [key: string]: number } = {};

        // 3. Parcourez tous les livres et augmentez le compte pour chaque authorId.
        allBooks.forEach((book: { author: { id: string } }) => {
          const authorId = book.author.id;
          if (bookCountByAuthor[authorId]) {
            bookCountByAuthor[authorId]++;
          } else {
            bookCountByAuthor[authorId] = 1;
          }
        });

        // Obtenez tous les auteurs.
        const authorsResponse = await axios.get(
          'http://localhost:3001/authors',
        );
        const authorData = authorsResponse.data;

        // 4. Mettez à jour les auteurs avec le compte des livres.
        const authorsWithBookCounts = authorData.map(
          (author: PlainAuthorPresenter) => {
            return { ...author, bookCount: bookCountByAuthor[author.id] || 0 };
          },
        );
        setAuthors(authorsWithBookCounts);
        setLoading(false);
      } catch (e) {
        setError((e as AxiosError).message);
        setLoading(false);
      }
    };

    loadAuthorsWithBookCount();
  }, []);

  const handleAuthorFormSubmit = async () => {
    await createAuthor(); // Ajouter cette ligne pour appeler la fonction createAuthor
    closeModal();
  };

  const createAuthor = async () => {
    try {
      const params = {
        firstName: newAuthorData.firstName,
        lastName: newAuthorData.lastName,
        photoUrl: newAuthorData.photoUrl,
      };

      const response = await axios.post('http://localhost:3001/authors', null, {
        params,
      });

      const createdAuthor: AuthorWithBookCount = {
        // Specify the type here
        ...newAuthorData,
        id: response.data.ids,
        bookCount: 0, // Add default bookCount here
      };
      setAuthors((prev) => [...prev, createdAuthor]);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };

  const deleteAuthor = async (Id: string) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${Id}`);
      const updatedAuthors = authors.filter((author) => author.id !== Id);
      setAuthors(updatedAuthors);
    } catch (e) {
      setError((e as AxiosError).message);
    }
  };
  return (
    <div>
      <Navbar currentPage="Auteurs" />
      <div className="m-10">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
          Liste des auteurs
        </h1>

        {loading && <p className="text-gray-600 text-center">Chargement...</p>}
        {error && (
          <p className="text-red-600 text-center">{`Erreur : ${error}`}</p>
        )}

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un auteur..."
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <Button onClick={openModal} color="primary">
          Créer un auteur
        </Button>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
          {authors
            .filter((author) => {
              if (!searchTerm) return true;
              const fullName =
                `${author.firstName} ${author.lastName}`.toLowerCase();
              return fullName.includes(searchTerm.toLowerCase());
            })
            .map((author) => (
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
                    {`${author.firstName} ${author.lastName} (${
                      author.bookCount
                    } ${author.bookCount > 1 ? 'livres' : 'livre'})`}
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
        {/* Modal for creating/editing an author */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Créer un nouvel auteur</h2>
          <form>
            <div className="mb-4">
              <label className="block font-semibold">Prénom:</label>
              <input
                type="text"
                value={newAuthorData.firstName}
                onChange={(e) =>
                  setNewAuthorData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Nom de famille:</label>
              <input
                type="text"
                value={newAuthorData.lastName}
                onChange={(e) =>
                  setNewAuthorData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">URL de la photo:</label>
              <input
                type="text"
                value={newAuthorData.photoUrl}
                onChange={(e) =>
                  setNewAuthorData((prev) => ({
                    ...prev,
                    photoUrl: e.target.value,
                  }))
                }
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button onClick={closeModal} color="gray" variant="outline">
                Annuler
              </Button>
              <Button onClick={handleAuthorFormSubmit} color="blue">
                Créer
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AuthorsPage;
