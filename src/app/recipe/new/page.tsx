import { Metadata } from 'next';

import { RecipeForm } from '@/components';
import { PageLayout } from '@/layouts';

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
