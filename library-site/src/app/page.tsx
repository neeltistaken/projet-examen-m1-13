import { FC, ReactElement } from 'react';
import Image from 'next/image';

const Home: FC = (): ReactElement => (
  <main className="flex flex-col items-center pt-24">
    <Image src="/logo.png" alt="logo" width={200} height={200} />
    <h1 className="text-6xl font-bold text-center text-gray-800">
      Biblio&apos;tech
    </h1>
  </main>
);

export default Home;
