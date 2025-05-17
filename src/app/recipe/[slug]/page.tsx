import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { getAmountTypes, getIngredients } from '@/cachedFetchMethods';
import { RecipeBookmarkSelect, TimeSince } from '@/components';
import { PageLayout } from '@/layouts';
import { recipesService } from '@/services';
import { Avatar, Table, TableColumn } from '@/ui';
import { arrayToDictionary } from '@/utils';

import { ImagesGallery, RecipeControls } from './components';

const recipesTableColumns: TableColumn[] = [{ keyOrComponent: 'ingredientName' }, { keyOrComponent: 'amountTypeValue' }];

type RecipePageProps = Promise<{
  slug: string;
}>;

export const generateMetadata = async ({ params }: { params: RecipePageProps }): Promise<Metadata> => {
  const { slug } = await params;
  const response = await recipesService.getRecipeBySlug(slug);

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
  const [recipeResponse, ingredients, amountTypes] = await Promise.all([
    recipesService.getRecipeBySlug(slug),
    getIngredients(),
    getAmountTypes(),
  ]);

  if (recipeResponse.status !== 200) {
    notFound();
  }

  const recipe = recipeResponse.data;
  const ingredientsMap = arrayToDictionary(ingredients ?? [], 'id');
  const amountTypesMap = arrayToDictionary(amountTypes ?? [], 'id');

  const tableRows = recipe.ingredients.map(recipeIngredient => ({
    id: recipeIngredient.id,
    ingredientName: ingredientsMap[recipeIngredient.ingredientId].name,
    amountTypeValue: `${recipeIngredient.count} ${amountTypesMap[recipeIngredient.amountTypeId].name}`,
  }));

  return (
    <PageLayout>
      <section>
        <div className="flex flex-nowrap items-center gap-3">
          <Link href={`/user/${recipe.user?.id}`} className="flex items-center gap-1 hover:underline cursor-pointer">
            {recipe.user && <Avatar user={recipe.user} size={32} />}
            <span className="title-m">{recipe.user?.userName}</span>
          </Link>
          <TimeSince startTime={recipe.createdAt} />
          {!recipe.isPublished && <p className="bg-error-container text-error px-2 py-1 rounded-sm label-l ml-2">На модерации</p>}
          <div className="flex flex-nowrap items-center ml-auto gap-5">
            <RecipeControls recipe={recipe} />
            <RecipeBookmarkSelect recipeId={recipe.id} className="min-w-60" />
          </div>
        </div>
        <h1 className="headline-l text-primary text-balance mt-2">{recipe.title}</h1>
        <p className="body-l mt-8 text-pretty">{recipe.description}</p>
        {recipe.images && recipe.images.length > 0 && (
          <ImagesGallery
            items={recipe.images}
            additionalClass="max-w-[450px] mt-10"
            thumbnailPosition="right"
            showFullscreenButton={false}
          />
        )}
      </section>
      <section className="mt-16">
        <h3 className="headline-l">Ингредиенты</h3>
        <Table columns={recipesTableColumns} showTableHead={false} rows={tableRows} />
      </section>
      <section className="mt-16">
        <h3 className="headline-l">Этапы приготовления</h3>
        {recipe.steps.map((step, index) => (
          <div key={index} className=" mt-8 border-b border-primary/50 pb-4">
            <h4 className="title-l">Шаг {index + 1}</h4>
            <p className="body-l mt-3 text-pretty">{step.content}</p>
          </div>
        ))}
      </section>
    </PageLayout>
  );
};

export default RecipePage;
