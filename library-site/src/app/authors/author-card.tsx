import Link from 'next/link';
import { ReactElement } from 'react';
import { PlainAuthorModel } from '@/models';

interface AuthorCardProps {
  author: PlainAuthorModel;
}

export function AuthorCard({ author }: AuthorCardProps): ReactElement {
  const numberOfBooks = author.books?.length || 0;

  return (
    <Link href={`/authors/${author.id}`}>
      <li className="shadow-lg rounded-lg">
        <img
          src={`https://${
            // conflict between prettier and eslint
            // prettier-ignore
            author.photoUrl
            || `ui-avatars.com/api/?name=${author.firstName}+${author.lastName}&size=256`
          }`}
          alt={`${author.firstName} ${author.lastName}`}
          className="w-full h-48 xs:h-56 sm:h-64 object-cover rounded-t-lg"
        />
        <div className="p-3 text-center">
          <h2 className="text-xl font-semibold">
            {/* conflict between prettier and eslint */}
            {/* eslint-disable-next-line */}
            {author.firstName} {author.lastName}
          </h2>
          <div className="text-gray-500 text-sm">
            {numberOfBooks === 0
              ? 'aucun livre'
              : `${numberOfBooks} livre${numberOfBooks > 1 ? 's' : ''}`}
          </div>
        </div>
      </li>
    </Link>
  );
}
