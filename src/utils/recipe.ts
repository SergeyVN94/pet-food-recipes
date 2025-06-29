import { RecipeImageDto } from '@/types';

export const getRecipeImageUrl = (fileName: RecipeImageDto['fileName']) =>
  `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}/${process.env.NEXT_PUBLIC_BUCKET}/recipes/${fileName}`;
