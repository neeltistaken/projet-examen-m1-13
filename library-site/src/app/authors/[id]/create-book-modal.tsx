import { ReactElement, useState } from 'react';
import { Modal } from '@/components/modal';
import { Button } from '@/components/button';
import { useBookActions } from '@/hooks';

interface CreateBookModalType {
  authorId: string;
  isOpen: boolean;
  onClose: () => void;
  refreshAuthor: () => void;
}

export function CreateBookModal({
  authorId,
  isOpen,
  onClose,
  refreshAuthor,
}: CreateBookModalType): ReactElement {
  const [bookName, setBookName] = useState('');
  const { createBook } = useBookActions();
  const handleCreation = (): void => {
    createBook({ authorId, title: bookName })
      .then(() => {
        refreshAuthor();
        onClose();
      })
      .catch((e) => Error(e));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Ajout d&apos;un livre</h2>
      <div className="mb-4">
        <span className="block font-semibold">Titre</span>
        <input
          type="text"
          value={bookName}
          onChange={(e): void => setBookName(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>
      <div className="flex gap-5 justify-end mt-5">
        <Button onClick={onClose} color="gray" variant="outline">
          Annuler
        </Button>
        <Button onClick={handleCreation} color="primary">
          Créer le livre
        </Button>
      </div>
    </Modal>
  );
}
