'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { IconDelete, IconMenu, IconModeEdit, IconPublic } from '@/assets/icons';
import { useDeleteRecipe, usePublishRecipe, useUser, useUserRoles } from '@/hooks';
import { RecipeEntity } from '@/types';
import { Button, ButtonIcon, Menu, MenuItem } from '@/ui';
import { cn, showToast } from '@/utils';

type RecipeControlsProps = {
  recipe: RecipeEntity;
  className?: string;
};

const RecipeControls = ({ recipe, className }: RecipeControlsProps) => {
  const { data: user } = useUser();
  const router = useRouter();
  const { isAdmin, isModerator } = useUserRoles();
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
  const isRecipeAuthor = user?.id === recipe.user.id;

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

  const handleEditButtonClick = () => {
    router.push(`/recipe/${recipe.slug}/edit`);
  };

  const menuItems: MenuItem[] = [];

  if (!recipe.isPublished && (isAdmin || isModerator)) {
    menuItems.push({
      label: 'Опубликовать',
      icon: IconPublic,
      onSelect: handlePublishButtonClick,
    });
  }

  if (isAdmin || isRecipeAuthor) {
    menuItems.push({
      label: 'Редактировать',
      icon: IconModeEdit,
      onSelect: handleEditButtonClick,
    });
  }

  if (isAdmin || isModerator) {
    menuItems.push({
      label: 'Удалить',
      icon: IconDelete,
      onSelect: handleDeleteButtonClick,
    });
  }

  return (
    menuItems.length > 0 && (
      <div className={cn('flex justify-end gap-2', className)}>
        <Menu trigger={<ButtonIcon variant="filled" icon={IconMenu} />} items={menuItems} contentProps={{ align: 'end' }} />
      </div>
    )
  );
};

export default RecipeControls;
