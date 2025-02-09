import { Metadata } from 'next';

import { AuthCheck, RecipeForm } from '@/components';
import { PageLayout } from '@/layouts';

export const metadata: Metadata = {
  title: 'Добавить рецепт',
};

const NewRecipePage = () => (
  <PageLayout>
    <h1 className="headline-m">Добавить рецепт</h1>
    <AuthCheck>
      <RecipeForm className="mt-8" />
    </AuthCheck>
  </PageLayout>
);

export default NewRecipePage;
