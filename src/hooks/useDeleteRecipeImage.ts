import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipesService } from '@/services';
import { RecipeImageDto } from '@/types';

type MutationVariables = {
  imageId: RecipeImageDto['id'];
};

const mutationFn = async ({ imageId }: MutationVariables) => {
  return (await recipesService.deleteImage(imageId)).data;
};

const useDeleteRecipeImage = (config: UseMutationOptions<RecipeImageDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<RecipeImageDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['recipes', 'delete-image'],
    ...config,
  });

export default useDeleteRecipeImage;
