import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import { IconSchedule } from '@/assets/icons';
import { getAmountTypes, getIngredients } from '@/cachedFetchMethods';
import { Table, TableColumn } from '@/components/ui';
import { PageLayout } from '@/layouts';
import { RecipeService } from '@/services';
import { AmountTypeDto, IngredientDto } from '@/types';
import { getTimeSince } from '@/utils';

const recipesTableColumns: TableColumn[] = [{ keyOrComponent: 'ingredientName' }, { keyOrComponent: 'amountTypeValue' }];

type RecipePageProps = Promise<{
  slug: string;
}>;

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
  const [recipeResponse, ingredients, amountTypes] = await Promise.all([RecipeService.getRecipe(slug), getIngredients(), getAmountTypes()]);

  if (recipeResponse.status !== 200) {
    notFound();
  }

  const recipe = recipeResponse.data;

  const ingredientsMap = ingredients.reduce<Record<IngredientDto['id'], IngredientDto>>((acc, ingredient) => {
    acc[ingredient.id] = ingredient;

    return acc;
  }, {});

  const amountTypesMap = amountTypes.reduce<Record<AmountTypeDto['id'], AmountTypeDto>>((acc, amountType) => {
    acc[amountType.id] = amountType;

    return acc;
  }, {});

  const tableRows = recipe.ingredients.map(recipeIngredient => ({
    id: recipeIngredient.id,
    ingredientName: ingredientsMap[recipeIngredient.ingredientId].name,
    amountTypeValue: `${recipeIngredient.count} ${amountTypesMap[recipeIngredient.amountTypeId].name}`,
  }));

  return (
    <PageLayout>
      <p className="title-m flex flex-nowrap items-center gap-1 mb-2">
        <IconSchedule className="size-6" />
        <span>{getTimeSince(recipe.createdAt)}</span>
      </p>
      <h1 className="headline-l text-primary">{recipe.title}</h1>
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
            <h4 className="title-l">Шаг {index + 1}</h4>
            <p className="body-l mt-3">{step.content}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  );
};

export default RecipePage;
