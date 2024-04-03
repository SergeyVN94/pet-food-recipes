import { Header, SearchBar } from '@/components';
import { RecipeService } from '@/services';

import ActualRecipesList from './components/ActualRecipesList';

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
          <SearchBar delay={350} placeholder="Введите запрос" isClearable />
          <ActualRecipesList initialRecipes={res.data} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
