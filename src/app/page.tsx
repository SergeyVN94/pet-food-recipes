import { Suspense } from 'react';

import { getIngredients } from '@/cachedFetchMethods';
import { SearchBar } from '@/components';
import { PageLayout } from '@/layouts';
import { RecipeService } from '@/services';

import { ActualRecipesList, ActualRecipesListSkeleton, Filters } from './home/components';
import { searchParamsToFilter } from './home/lib';

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
    ingredients?: string[];
  }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const localSearchParams = await searchParams;
  const filter = searchParamsToFilter(localSearchParams);
  const [recipes, ingredients] = await Promise.all([RecipeService.postRecipesSearch(filter), getIngredients()]);

  return (
    <PageLayout className="grid grid-cols-[minmax(400px,1fr),minmax(200px,300px)] gap-4">
      <div>
        <SearchBar delay={350} placeholder="Введите запрос" isClearable />
        <Suspense fallback={<ActualRecipesListSkeleton />}>
          <ActualRecipesList initialRecipes={recipes.data} initialIngredients={ingredients} />
        </Suspense>
      </div>
      <aside>
        <Filters />
      </aside>
    </PageLayout>
  );
};

export default HomePage;
