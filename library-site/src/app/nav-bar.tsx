'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

export function NavBar(): ReactElement {
  const pathname = usePathname();

  const navLinks = [
    { text: 'Accueil', path: '/' },
    { text: 'Livres', path: '/books' },
    { text: 'Auteurs', path: '/authors' },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 py-2 sm:py-4 flex items-center justify-center gap-4">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>
        <div className="flex flex-wrap sm:gap-4 flex-col sm:flex-row">
          {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.path}
              className={`text-gray-300 px-3 py-1 rounded-md font-semibold hover:bg-gray-900 ${
                pathname === link.path && 'text-primary-500'
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
