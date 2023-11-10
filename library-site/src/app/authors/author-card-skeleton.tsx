import { ReactElement } from 'react';

export function AuthorCardSkeleton(): ReactElement {
  return (
    <li className="shadow-lg rounded-lg">
      <div className="w-full h-48 rounded-t-lg bg-gray-400" />
      <div className="h-14 bg-gray-200" />
    </li>
  );
}
