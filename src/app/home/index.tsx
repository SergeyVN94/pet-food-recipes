import { Header } from '@/components';
import { RecipeService } from '@/services';

import ActualRecipesList from './components/ActualRecipesList';
import Search from './components/Search';

type HomePageProps = {
  params: {};
  searchParams: {
    q?: string;
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const res = await RecipeService.getRecipes(searchParams.q ?? '');

  return (
    <div>
      <Header />
      <main>
        <div className="container py-12">
          <Search />
          <ActualRecipesList initialRecipes={res.data} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
