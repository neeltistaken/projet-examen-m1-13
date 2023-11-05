import { FC, ReactElement } from 'react';
import Navbar from './NavBar';

const Home: FC = (): ReactElement => (
  <>
    <Navbar current_page="Accueil" />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Biblio'tech
    </main>
  </>
);

export default Home;
