import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import { NavBar } from '@/app/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
  icons: {
    icon: [
      { sizes: '16x16', url: '/favicon-16x16.png', type: 'image/png' },
      { sizes: '32x32', url: '/favicon-32x32.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
