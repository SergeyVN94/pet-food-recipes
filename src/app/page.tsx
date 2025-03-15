import { Suspense } from 'react';

import { getAmountTypes, getIngredients } from '@/cachedFetchMethods';
import { SearchBar } from '@/components';
import { PageLayout } from '@/layouts';
import { recipesService } from '@/services';

import { ActualRecipesList, ActualRecipesListSkeleton, Filters } from './home/components';
import { searchParamsToFilter } from './home/lib';

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
    isDeleted?: string;
    isPublished?: string;
    ingredients?: string[];
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const localSearchParams = await searchParams;
  const filter = searchParamsToFilter(localSearchParams);
  const [recipes, ingredients, amountTypes] = await Promise.all([
    recipesService.postRecipesSearch(filter),
    getIngredients(),
    getAmountTypes(),
  ]);

  return (
    <PageLayout className="grid grid-cols-[minmax(400px,1fr),minmax(200px,300px)] gap-4">
      <section>
        <Suspense fallback={<div className="skeleton w-full h-[3.5rem]" />}>
          <SearchBar delay={350} placeholder="Введите запрос" isClearable />
        </Suspense>
        <Suspense fallback={<ActualRecipesListSkeleton />}>
          <ActualRecipesList initialRecipes={recipes.data} initialIngredients={ingredients} />
        </Suspense>
      </section>
      <aside className="flex flex-col gap-3">
        <Suspense fallback={<div className="skeleton w-full h-full" />}>
          <Filters initialIngredients={ingredients} initialAmountTypes={amountTypes} />
        </Suspense>
        <div className="card-outlined sticky top-4">
          <h4 className="font-semibold mb-2">Контакты</h4>
          <a type="email" href="mailto:pet-food-recipes@yandex.ru" className="text-primary font-semibold body-l">
            pet-food-recipes@yandex.ru
          </a>
        </div>
      </aside>
    </PageLayout>
  );
};

export default HomePage;
