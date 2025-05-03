'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { IconClose, IconModeEdit } from '@/assets/icons';
import { useBookmarks, useCreateBookmark, useUpdateBookmark } from '@/hooks';
import { BookmarkDto } from '@/types/bookmarks';
import { ButtonIcon } from '@/ui';
import { showToast } from '@/utils';

import { BookmarkForm } from './components';

type BookmarkItemProps = {
  bookmark: BookmarkDto;
};

const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: updateBookmark, isPending: isUpdateBookmarkLoading } = useUpdateBookmark({
    onSuccess: data => {
      if (data) {
        showToast('success', 'Закладка успешно обновлена');
        setIsEditMode(false);
        queryClient.invalidateQueries({
          queryKey: ['bookmarks', 'get-bookmarks'],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ['bookmarks-recipes'],
          exact: false,
        });
      }
    },
    onError: error => {
      if (error) {
        let message = 'Что-то пошло не так';

        if (axios.isAxiosError(error) && error.response?.data?.message === 'BOOKMARK_WITH_THIS_TITLE_ALREADY_EXISTS') {
          message = 'Закладка с таким названием уже существует';
        }

        showToast('error', message);
      }
    },
  });

  const handleSubmit = (newTitle: string) => {
    if (isUpdateBookmarkLoading) {
      return;
    }

    updateBookmark({ bookmarkId: bookmark.id, title: newTitle });
  };

  return (
    <li className="flex flex-nowrap items-center gap-2 w-full elevation-3 bg-surface-dim px-4">
      {isEditMode ? (
        <div className="flex flex-nowrap items-center gap-2 w-full">
          <BookmarkForm value={bookmark.title} onSubmit={handleSubmit} isLoading={isUpdateBookmarkLoading} />
          <ButtonIcon onClick={() => setIsEditMode(false)} disabled={isUpdateBookmarkLoading} icon={IconClose} />
        </div>
      ) : (
        <div className="flex flex-nowrap items-center gap-2 w-full">
          <p className="title-m text-primary">{bookmark.title}</p>
          <p className="label-l ml-auto">Дата создания {dayjs(bookmark.createdAt).format('DD.MM.YYYY HH:mm')}</p>
          <ButtonIcon onClick={() => setIsEditMode(true)} disabled={isUpdateBookmarkLoading} icon={IconModeEdit} />
        </div>
      )}
    </li>
  );
};

const BookmarksSettingsPage = () => {
  const { data: bookmarks, isFetching: isBookmarksFetching, refetch } = useBookmarks();
  const { mutateAsync: createBookmark, isPending: isCreateBookmarkLoading, data, error } = useCreateBookmark();

  const handleCreateBookmarkSubmit = async (title: string) => {
    if (isCreateBookmarkLoading) {
      return;
    }

    await createBookmark({ title });
  };

  React.useEffect(() => {
    if (error) {
      let errorMessage = 'Произошла ошибка при создании закладки';

      if (axios.isAxiosError(error) && error.response?.data?.message === 'BOOKMARK_WITH_THIS_TITLE_ALREADY_EXISTS') {
        errorMessage = 'Закладка с таким названием уже существует';
      }

      showToast('error', errorMessage);
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      showToast('success', 'Закладка успешно создана');
      refetch();
    }
  }, [data]);

  return (
    <ul className="w-full flex flex-col gap-4">
      {isBookmarksFetching ? (
        <>
          <li className="skeleton h-12" />
          <li className="skeleton h-12" />
          <li className="skeleton h-12" />
          <li className="skeleton h-12" />
        </>
      ) : (
        <>
          {bookmarks?.map(bookmark => <BookmarkItem key={bookmark.id} bookmark={bookmark} />)}
          {bookmarks && bookmarks.length === 0 && <ul className="body-m">Закладок нет</ul>}
          <BookmarkForm onSubmit={handleCreateBookmarkSubmit} isNew />
        </>
      )}
    </ul>
  );
};

export default BookmarksSettingsPage;
