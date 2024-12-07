import { getCookie } from 'cookies-next/server';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PageLayout } from '@/layouts';
import { UserService } from '@/services';

import { RecipeForm } from './components';

export const metadata: Metadata = {
  title: 'Добавить рецепт',
};

const NewRecipePage = async () => {
  const authToken = await getCookie('authToken', { cookies });

  if (!authToken) {
    redirect('/auth/login');
  }

  try {
    const user = await UserService.getUser({ headers: { Authorization: `Bearer ${authToken}` } });

    if (!user) {
      redirect('/auth/login');
    }
  } catch (err) {
    redirect('/auth/login');
  }

  return (
    <PageLayout>
      <h1 className="headline-m">Добавить рецепт</h1>
      <RecipeForm className="mt-8" />
    </PageLayout>
  );
};

export default NewRecipePage;
