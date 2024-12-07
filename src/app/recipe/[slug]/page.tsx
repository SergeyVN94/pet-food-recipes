import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Table, TableColumn } from '@/components/ui';
import { PageLayout } from '@/layouts';
import { RecipeService } from '@/services';

const recipesTableColumns: TableColumn[] = [{ keyOrComponent: 'ingredientName' }, { keyOrComponent: 'amountTypeValue' }];

type RecipePageProps = {
  slug: string;
};

export const generateMetadata = async ({ params }: { params: RecipePageProps }): Promise<Metadata> => {
  const { slug } = await params;
  const response = await RecipeService.getRecipe(slug);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe = response.data;

  return {
    title: recipe.title,
  };
};

const RecipePage = async ({ params }: { params: RecipePageProps }) => {
  const { slug } = await params;
  const response = await RecipeService.getRecipe(slug);

  console.log(response.data);

  if (response.status !== 200) {
    redirect('/404');
  }

  const recipe = response.data;

  const tableRows = recipe.ingredients.map(ingredientUnit => ({
    id: ingredientUnit.id,
    ingredientName: ingredientUnit.ingredient.name,
    amountTypeValue: ingredientUnit.amountType.name,
  }));

  return (
    <PageLayout>
      <h1 className="headline-l">{recipe.title}</h1>
      <p className="body-l mt-8">{recipe.description}</p>
      {recipe.images && recipe.images.length > 0 && (
        <section className="mt-16 flex flex-wrap gap-4">
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
        </section>
      )}
      <section className="mt-16">
        <h3 className="headline-l">Ингредиенты</h3>
        <Table columns={recipesTableColumns} showTableHead={false} rows={tableRows} />
      </section>
      <section className="mt-16">
        <h3 className="headline-l">Этапы приготовления</h3>
        {recipe.steps.map((step, index) => (
          <div key={index} className=" mt-8 border-b border-primary/50 pb-4">
            <h4 className="title-l">Этап {index + 1}</h4>
            <p className="body-l mt-3">{step.value}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  );
};

export default RecipePage;
