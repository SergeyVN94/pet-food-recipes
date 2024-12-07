import { SearchBar } from '@/components';
import { PageLayout } from '@/layouts';
import { RecipeService } from '@/services';

import { ActualRecipesList, Filters } from './components';
import { searchParamsToFilter } from './lib';

type HomePageProps = {
  params: {};
  searchParams: {
    q?: string;
    ingredients?: string[];
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const localSearchParams = await searchParams;
  const filter = searchParamsToFilter(localSearchParams);
  const res = await RecipeService.postRecipesSearch(filter);

  return (
    <PageLayout className="grid grid-cols-[minmax(400px,1fr),minmax(200px,300px)] gap-4">
      <div>
        <SearchBar delay={350} placeholder="Введите запрос" isClearable />
        <ActualRecipesList initialRecipes={res.data} />
      </div>
      <aside>
        <Filters />
      </aside>
    </PageLayout>
  );
};

export default HomePage;
