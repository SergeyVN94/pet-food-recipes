import { Metadata } from 'next';

import { PageLayout } from '@/layouts';

import { RecipeForm } from './components';

export const metadata: Metadata = {
  title: 'Добавить рецепт',
};

const NewRecipePage = () => (
  <PageLayout>
    <h1 className="headline-m">Добавить рецепт</h1>
    <RecipeForm className="mt-8" />
  </PageLayout>
);

export default NewRecipePage;
