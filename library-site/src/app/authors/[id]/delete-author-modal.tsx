import { Modal } from '@/components/modal';
import { Button } from '@/components/button';
import { useAuthorActions } from '@/hooks';
import { useRouter } from 'next/navigation';

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
}: DeleteAuthorModalProps) {
  const router = useRouter();
  const { deleteAuthor } = useAuthorActions();
  const handleDelete = () => {
    deleteAuthor(authorId)
      .then(() => router.push('/authors'))
      .catch((e) => console.log(e));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Suppression d'un auteur</h2>
      <p>
        Vous êtes sur le point de supprimer l'auteur{' '}
        <span className="font-bold">{authorName}</span>, cette action est
        irréversible. <br />
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
