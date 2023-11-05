'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Navbar from "@/app/NavBar";

const BooksDetailsPage: FC = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      Books details &apos;
      {id}
      &apos; not implemented
    </>
  );
};

export default BooksDetailsPage;
