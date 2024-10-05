import { Header, SearchBar } from '@/components';
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
  const filter = searchParamsToFilter(searchParams);
  const res = await RecipeService.postRecipesSearch(filter);

  return (
    <div>
      <Header />
      <main>
        <div className="container py-12 grid grid-cols-[minmax(400px,1fr),minmax(200px,300px)] gap-4">
          <div>
            <SearchBar delay={350} placeholder="Введите запрос" isClearable />
            <ActualRecipesList initialRecipes={res.data} />
          </div>
          <aside>
            <Filters />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
