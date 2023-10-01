import { useQuery } from '@tanstack/react-query';

const RecipeCard = ({ name }: { name: string }) => {
  return <div>{name}</div>;
};

const ActualRecipesList = ({ search }: { search: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['recipe', 'get', search],
    queryFn: async ({ queryKey, signal }) => {
      const request = fetch(process.env.NEXT_PUBLIC_API_SERVER + '/api/v1/recipe', {
        signal,
      });

      return (await (await request).json()) as any[];
    },
    initialData: [],
  });

  console.log(data);
  

  return isLoading ? (
    'Загрузка...'
  ) : (
    <ul>
      {(data || []).map((i) => (
        <li key={JSON.stringify(i)}>
          <RecipeCard name={JSON.stringify(i)} />
        </li>
      ))}
    </ul>
  );
};

export default ActualRecipesList;
