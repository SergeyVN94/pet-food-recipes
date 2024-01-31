import { Header } from '@/components';
import ActualRecipesList from './components/ActualRecipesList';
import Search from './components/Search';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="container py-12">
          <Search />
          <ActualRecipesList />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
