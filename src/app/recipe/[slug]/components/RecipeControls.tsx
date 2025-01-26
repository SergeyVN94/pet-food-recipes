'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { IconDelete, IconModeEdit } from '@/assets/icons';
import { Button, ButtonIcon } from '@/components/ui';
import { useDeleteRecipe, useUser } from '@/hooks';
import { RecipeDto } from '@/types';
import { cn, showToast } from '@/utils';

type RecipeControlsProps = {
  recipe: RecipeDto;
  className?: string;
};

const RecipeControls = ({ recipe, className }: RecipeControlsProps) => {
  const { data: user } = useUser();
  const router = useRouter();
  const { mutateAsync, isPending, error, data } = useDeleteRecipe();
  const queryClient = useQueryClient();

  const handleDeleteButtonClick = () => {
    const handleConfirmClick = () => {
      mutateAsync(recipe.slug);
    };

    showToast(
      'default',
      ({ closeToast }) => (
        <div className="p-5">
          <p className="title-l">Вы действительно хотите удалить рецепт «{recipe.title}» ?</p>
          <div className="flex justify-end gap-2 mt-5">
            <Button
              variant="filled"
              onClick={() => {
                handleConfirmClick();
                closeToast();
              }}
              className="min-w-24"
            >
              Да
            </Button>
            <Button variant="outline" onClick={closeToast} className="min-w-24">
              Нет
            </Button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false },
    );
  };

  const handleAditButtonClick = () => {
    router.push(`/recipe/${recipe.slug}/edit`);
  };

  React.useEffect(() => {
    if (error) {
      let errorMessage = 'Произошла ошибка при удалении рецепта';

      if (axios.isAxiosError(error) && error.response?.data?.message === 'INSUFFICIENT_PERMISSIONS') {
        errorMessage = 'Недостаточно прав для удаления рецепта';
      }

      showToast('error', errorMessage);
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      showToast('success', `Рецепт «${data.title}» успешно удален`);
      queryClient.invalidateQueries({
        queryKey: ['bookmarks-recipes'],
        exact: true,
      });
      router.push('/');
    }
  }, [data]);

  return (
    (user?.role === 'ADMIN' || user?.id === recipe.user.id) && (
      <div className={cn('flex justify-end gap-2', className)}>
        <ButtonIcon variant="filled" disabled={isPending} onClick={handleAditButtonClick} title="Редактировать">
          <IconModeEdit />
        </ButtonIcon>
        <ButtonIcon variant="filled" disabled={isPending} onClick={handleDeleteButtonClick} title="Удалить">
          <IconDelete className="text-error" />
        </ButtonIcon>
      </div>
    )
  );
};

export default RecipeControls;
