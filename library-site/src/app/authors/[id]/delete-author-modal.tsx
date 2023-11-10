import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { Modal } from '@/components/modal';
import { Button } from '@/components/button';
import { useAuthorActions } from '@/hooks';

interface DeleteAuthorModalProps {
  authorId: string;
  authorName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAuthorModal({
  authorId,
  authorName,
  isOpen,
  onClose,
}: DeleteAuthorModalProps): ReactElement {
  const router = useRouter();
  const { deleteAuthor } = useAuthorActions();
  const handleDelete = (): void => {
    deleteAuthor(authorId)
      .then(() => router.push('/authors'))
      .catch((e) => Error(e));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Suppression d&apos;un auteur</h2>
      <p>
        {/* the eslint rule is disabled because interfering with prettier formatting */}
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Vous êtes sur le point de supprimer l&apos;auteur{' '}
        <span className="font-bold">{authorName}</span>
        , cette action est irréversible.
        <br />
        Êtes-vous sûr de vouloir continuer ?
      </p>
      <div className="flex gap-5 justify-end mt-5">
        <Button onClick={handleDelete} color="primary" variant="outline">
          Confirmer
        </Button>
        <Button onClick={onClose} color="gray">
          Annuler
        </Button>
      </div>
    </Modal>
  );
}
