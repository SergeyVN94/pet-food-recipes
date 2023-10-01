'use client';
import { useState } from 'react';
import { Header } from '@/components';
import ActualRecipesList from './ActualRecipesList.server';

const Home = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Header />
      <main>
        <div className="container pt-12">
          <input
            type="search"
            onChange={(val) => setSearch(val.target.value)}
            value={search}
          />
          <ActualRecipesList search={''} />
        </div>
      </main>
    </>
  );
};

export default Home;
