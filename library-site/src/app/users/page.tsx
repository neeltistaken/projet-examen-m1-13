'use client';

import { FC, ReactElement } from 'react';
import Navbar from "@/app/NavBar";

const UsersPage: FC = (): ReactElement => {

  return (
    <>
      <Navbar current_page="Utilisateurs" />
      <h1>Users</h1>
    </>
  );
};

export default UsersPage;