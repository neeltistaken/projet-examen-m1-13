import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { AuthorWithBookCount } from "./author-with-book-count";

interface CreateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreateAuthorData = {
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export function CreateAuthorModal({ isOpen, onClose }: CreateAuthorModalProps) {
  const [newAuthorData, setNewAuthorData] = useState<CreateAuthorData>({
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  const handleAuthorFormSubmit = async () => {
    await createAuthor(); // Ajouter cette ligne pour appeler la fonction createAuthor
    onClose();
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
      //setAuthors((prev) => [...prev, createdAuthor]);
    } catch (e) {
      //setError((e as AxiosError).message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button onClick={onClose} color="gray" variant="outline">
            Annuler
          </Button>
          <Button onClick={handleAuthorFormSubmit} color="blue">
            Créer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
