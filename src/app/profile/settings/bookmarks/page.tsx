'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { IconClose, IconModeEdit } from '@/assets/icons';
import { ButtonIcon } from '@/components/ui';
import { useBookmarks, useCreateBookmark, useUpdateBookmark } from '@/hooks';
import { BookmarkDto } from '@/types/bookmarks';
import { showToast } from '@/utils';

import { BookmarkForm } from './components';

type BookmarkItemProps = {
  bookmark: BookmarkDto;
};

const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const { mutateAsync: updateBookmark, isPending: isUpdateBookmarkLoading, data, error } = useUpdateBookmark();
  const queryClient = useQueryClient();

  const handleSubmit = (newTitle: string) => {
    if (isUpdateBookmarkLoading) {
      return;
    }

    updateBookmark({ bookmarkId: bookmark.id, title: newTitle });
  };

  React.useEffect(() => {
    if (error) {
      let message = 'Что-то пошло не так';

      if (axios.isAxiosError(error) && error.response?.data?.message === 'Bookmark with this title already exists') {
        message = 'Закладка с таким названием уже существует';
      }

      showToast('error', message);
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      showToast('success', 'Закладка успешно обновлена');
      setIsEditMode(false);
      queryClient.invalidateQueries({
        queryKey: ['bookmarks', 'get-bookmarks'],
        exact: true,
      });
    }
  }, [data]);

  return (
    <li className="flex flex-nowrap items-center gap-2 w-full elevation-3 bg-surface-dim px-4">
      {isEditMode ? (
        <div className="flex flex-nowrap items-center gap-2 w-full">
          <BookmarkForm value={bookmark.title} onSubmit={handleSubmit} isLoading={isUpdateBookmarkLoading} />
          <ButtonIcon onClick={() => setIsEditMode(false)} disabled={isUpdateBookmarkLoading}>
            <IconClose className="size-6" />
          </ButtonIcon>
        </div>
      ) : (
        <div className="flex flex-nowrap items-center gap-2 w-full">
          <p className="title-m text-primary">{bookmark.title}</p>
          <p className="label-l ml-auto">Дата создания {dayjs(bookmark.createdAt).format('DD.MM.YYYY HH:mm')}</p>
          <ButtonIcon onClick={() => setIsEditMode(true)} disabled={isUpdateBookmarkLoading}>
            <IconModeEdit />
          </ButtonIcon>
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

      if (axios.isAxiosError(error) && error.response?.data?.message === 'Bookmark with this title already exists') {
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
