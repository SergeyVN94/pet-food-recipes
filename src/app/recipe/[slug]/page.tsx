import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Header } from '@/components';
import { Recipe } from '@/types';

type RecipePageProps = {
  slug: string;
};

export const generateMetadata = async ({ params }: { params: RecipePageProps }): Promise<Metadata> => {
  const { slug } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/recipes/${slug}`);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe: Recipe = await response.json();

  console.log(recipe);

  return {
    title: recipe.title,
  };
};

const RecipePage = async ({ params: { slug } }: { params: RecipePageProps }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/recipes/${slug}`);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe: Recipe = await response.json();

  return (
    <div>
      <Header />
      <main>
        <div className="container pt-12">
          <h1 className="headline-l">{recipe.title}</h1>
          <p className="body-l mt-8">{recipe.description}</p>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
