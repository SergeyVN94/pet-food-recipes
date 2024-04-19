import { Header, SearchBar } from '@/components';
import { RecipeService } from '@/services';

import ActualRecipesList from './components/ActualRecipesList';

type HomePageProps = {
  params: {};
  searchParams: {
    q?: string;
    ingredients?: string[];
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const res = await RecipeService.postRecipes({
    q: searchParams.q,
    ingredients: searchParams.ingredients,
  });

  return (
    <div>
      <Header />
      <main>
        <div className="container py-12 flex gap-3">
          <div className="w-full">
            <SearchBar delay={350} placeholder="Введите запрос" isClearable />
            <ActualRecipesList initialRecipes={res.data} />
          </div>
          <aside className="w-1/5 min-w-[250px]"></aside>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
