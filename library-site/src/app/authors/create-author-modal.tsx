import { useState } from 'react';
import { AxiosError } from 'axios';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { useAuthorActions } from '@/hooks';

interface CreateAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshAuthors: () => void;
}

type CreateAuthorData = {
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export function CreateAuthorModal({
  isOpen,
  onClose,
  refreshAuthors,
}: CreateAuthorModalProps) {
  const { createAuthor } = useAuthorActions();
  const [newAuthorData, setNewAuthorData] = useState<CreateAuthorData>({
    firstName: '',
    lastName: '',
    photoUrl: '',
  });

  const formFields = [
    {
      label: 'Prénom',
      value: newAuthorData.firstName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewAuthorData((prev) => ({
          ...prev,
          firstName: e.target.value,
        })),
    },
    {
      label: 'Nom de famille',
      value: newAuthorData.lastName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewAuthorData((prev) => ({
          ...prev,
          lastName: e.target.value,
        })),
    },
    {
      label: 'URL de la photo (sans https://)',
      value: newAuthorData.photoUrl,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewAuthorData((prev) => ({
          ...prev,
          photoUrl: e.target.value,
        })),
    },
  ];

  const handleAuthorFormSubmit = async () => {
    await createAuthor(newAuthorData)
    // .then(() => {
    //   refreshAuthors();
    //   onClose();
    // })
    // .catch((error: AxiosError) => console.log(error));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl text-center font-bold mb-4">Nouvel auteur</h2>
      <form>
        {formFields.map((field) => (
          <div className="mb-4" key={field.label}>
            <label className="block font-semibold">{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={field.onChange}
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>
        ))}
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} color="gray" variant="outline">
            Annuler
          </Button>
          <Button onClick={handleAuthorFormSubmit} color="primary">
            Créer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
