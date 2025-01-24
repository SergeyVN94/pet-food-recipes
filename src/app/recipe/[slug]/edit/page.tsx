import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { RecipeForm } from '@/components';
import { PageLayout } from '@/layouts';
import { RecipeService } from '@/services';

type RecipePageProps = Promise<{
  slug: string;
}>;

export const generateMetadata = async ({ params }: { params: RecipePageProps }): Promise<Metadata> => {
  const { slug } = await params;
  const response = await RecipeService.getRecipeBySlug(slug);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe = response.data;

  return {
    title: `Редактировать ${recipe.title}`,
  };
};

const RecipePage = async ({ params }: { params: RecipePageProps }) => {
  const { slug } = await params;
  const recipeResponse = await RecipeService.getRecipeBySlug(slug);

  if (recipeResponse.status !== 200) {
    notFound();
  }

  return (
    <PageLayout>
      <h1 className="headline-m">Редактировать рецепт</h1>
      <RecipeForm className="mt-8" initialRecipe={recipeResponse.data} />
    </PageLayout>
  );
};

export default RecipePage;
