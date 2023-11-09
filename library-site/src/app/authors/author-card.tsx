import { PlainAuthorModel } from '@/models';

interface AuthorCardProps {
  author: PlainAuthorModel;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const numberOfBooks = author.books?.length || 0;

  return (
    <li className="shadow-lg rounded-lg flex-initial">
      <img
        src={`https://${
          author.photoUrl ||
          `ui-avatars.com/api/?name=${author.firstName}+${author.lastName}&size=256`
        }`}
        alt={`photo de ${author.firstName} ${author.lastName}`}
        className="w-full h-48 xs:h-56 sm:h-64 object-cover rounded-t-lg"
      />
      <div className="p-3 text-center">
        <h2 className="text-xl font-semibold">
          {author.firstName} {author.lastName}
        </h2>
        <div className="text-gray-500 text-sm">
          {numberOfBooks === 0
            ? 'aucun livre'
            : `${numberOfBooks} livre${numberOfBooks > 1 ? 's' : ''}`}
        </div>
      </div>
    </li>
  );
}
