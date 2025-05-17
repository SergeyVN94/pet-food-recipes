import { RecipeImageDto } from '@/types';

export const getRecipeImageUrl = (recipeImage: RecipeImageDto) =>
  `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}/${process.env.NEXT_PUBLIC_BUCKET}/recipes/${recipeImage.fileName}`;
