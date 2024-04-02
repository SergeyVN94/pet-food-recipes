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
  const response = await fetch(`${process.env.NEXT_BASE_API_URL}/api/v1/recipes/${slug}`);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe: Recipe = await response.json();

  return {
    title: recipe.title,
  };
};

const RecipePage = async ({ params: { slug } }: { params: RecipePageProps }) => {
  const response = await fetch(`${process.env.NEXT_BASE_API_URL}/api/v1/recipes/${slug}`);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe: Recipe = await response.json();

  return (
    <div>
      <Header />
      <main className="container pt-12 pb-16">
        <h1 className="headline-l">{recipe.title}</h1>
        <p className="body-l mt-8">{recipe.description}</p>
        {recipe.images.length > 0 && (
          <div className="mt-16 flex flex-wrap gap-4">
            {recipe.images.map((src, index) => (
              <div key={src} className="flex-1 basis-[32%]">
                <Image
                  fill
                  alt={`Изображение ${index}`}
                  src={`${process.env.NEXT_STATIC_SERVER_URL}${src}`}
                  className="!static block max-h-[400px] object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
        <section className="mt-16">
          <h3 className="headline-l">Ингредиенты</h3>
          <table className="mt-8 border border-primary/50">
            <tbody>
              {recipe.ingredients.map((unit) => (
                <tr key={unit.id}>
                  <td className="p-2 border border-primary/50">{unit.ingredient.name}</td>
                  <td className="p-2 border border-primary/50">{`${unit.count} ${unit.amountType.name}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="mt-16">
          <h3 className="headline-l">Этапы приготовления</h3>
          {recipe.steps.map((step, index) => (
            <div key={index} className=" mt-8 border-b border-primary/50 pb-4">
              <h4 className="title-l">Этап {index + 1}</h4>
              <p className="body-l mt-3">{step}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default RecipePage;
