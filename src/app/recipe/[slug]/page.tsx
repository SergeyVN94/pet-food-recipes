import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Image from 'next/image';

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
        <div className="container py-12">
          <h1 className="headline-l">{recipe.title}</h1>
          <p className="body-l mt-8">{recipe.description}</p>
          {recipe.images.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {recipe.images.map((src, index) => (
                <div key={src} className="flex-1 basis-[32%]">
                  <Image
                    fill
                    alt={`Изображение ${index}`}
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${process.env.NEXT_PUBLIC_STATIC_DIR}/recipes/${src}`}
                    className="!static block max-h-[400px] object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipePage;
