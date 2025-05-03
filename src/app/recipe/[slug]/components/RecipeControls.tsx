'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { IconDelete, IconFileDownload, IconModeEdit } from '@/assets/icons';
import { useDeleteRecipe, useUser } from '@/hooks';
import usePublishRecipe from '@/hooks/usePublishRecipe';
import { RecipeEntity, UserRoles } from '@/types';
import { Button, ButtonIcon } from '@/ui';
import { cn, showToast } from '@/utils';

type RecipeControlsProps = {
  recipe: RecipeEntity;
  className?: string;
};

const RecipeControls = ({ recipe, className }: RecipeControlsProps) => {
  const { data: user } = useUser();
  const router = useRouter();
  const { mutateAsync, isPending } = useDeleteRecipe({
    onError: error => {
      if (error) {
        let errorMessage = 'Произошла ошибка при удалении рецепта';

        if (axios.isAxiosError(error) && error.response?.data?.message === 'INSUFFICIENT_PERMISSIONS') {
          errorMessage = 'Недостаточно прав для удаления рецепта';
        }

        showToast('error', errorMessage);
      }
    },
    onSuccess: data => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['bookmarks-recipes'],
          exact: true,
        });

        showToast('success', `Рецепт «${data.title}» успешно удален`);
        router.push('/');
      }
    },
  });
  const { mutateAsync: publish, isPending: isPublishing } = usePublishRecipe({
    onSuccess: data => {
      if (data) {
        showToast('success', `Рецепт «${data.title}» успешно опубликован`);
        router.refresh();
      }
    },
    onError: error => {
      if (error) {
        showToast('error', 'Произошла ошибка при публикации рецепта');
        console.error(error);
      }
    },
  });
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
              className="min-w-20"
            >
              Да
            </Button>
            <Button variant="outline" onClick={closeToast} className="min-w-20">
              Нет
            </Button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false },
    );
  };

  const handlePublishButtonClick = () => {
    publish(recipe.slug);
  };

  const handleAditButtonClick = () => {
    router.push(`/recipe/${recipe.slug}/edit`);
  };

  const buttonPublish = !recipe.isPublished && (user?.role === UserRoles.ADMIN || user?.role === UserRoles.MODERATOR) && (
    <ButtonIcon variant="filled" disabled={isPublishing} onClick={handlePublishButtonClick} title="Опубликовать" icon={IconFileDownload} />
  );

  const buttonEdit = (user?.role === UserRoles.ADMIN || user?.id === recipe.user.id) && (
    <ButtonIcon variant="filled" disabled={isPending} onClick={handleAditButtonClick} title="Редактировать" icon={IconModeEdit} />
  );

  const buttonDelete = (user?.role === UserRoles.ADMIN || user?.id === recipe.user.id) && (
    <ButtonIcon variant="filled" disabled={isPending} onClick={handleDeleteButtonClick} title="Удалить" icon={IconDelete} />
  );

  return (
    (buttonEdit || buttonPublish || buttonDelete) && (
      <div className={cn('flex justify-end gap-2', className)}>
        {buttonPublish}
        {buttonEdit}
        {buttonDelete}
      </div>
    )
  );
};

export default RecipeControls;
