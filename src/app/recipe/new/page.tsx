import { Metadata } from 'next';

import { Header } from '@/components';

import { RecipeForm } from './components';

export const metadata: Metadata = {
  title: 'Добавить рецепт',
};

const NewRecipePage = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="container py-12">
          <h1 className="headline-l">Добавить рецепт</h1>
          <RecipeForm className="mt-8" />
        </div>
      </main>
    </div>
  );
};

export default NewRecipePage;
