'use client';

import React from 'react';

import axios from 'axios';

import { useUpdateUserAvatar } from '@/hooks';
import { FileInput } from '@/ui';
import { showToast } from '@/utils';

type UpdateAvatarProps = {
  className?: string;
};

const UpdateAvatar = ({ className }: UpdateAvatarProps) => {
  const [progress, setProgress] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUpdateUserAvatar({
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'FILE_SIZE_LIMIT') {
          showToast('error', 'Превышен размер файла. Не более 2MB');
        }
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setProgress(null);
    },
    onSuccess: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setProgress(null);

      showToast('success', 'Аватар обновлен');
    },
  });

  const handleFilesChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    if (isPending) {
      return;
    }

    const files = ev.target.files;

    if (files && files?.length > 0) {
      mutate({
        avatar: files[0],
        axiosConfig: {
          onUploadProgress: ev => {
            console.log(`${ev.loaded} / ${ev.total}`);

            setProgress(Math.round((ev.loaded * 100) / ev.total!));
          },
        },
      });
    }
  };

  return (
    <div className={className}>
      {progress !== null && (
        <progress max={100} value={progress} className="mb-1">
          {progress}%
        </progress>
      )}
      <FileInput
        className="w-full"
        onChange={handleFilesChange}
        label="Выберите изображение"
        accept="image/jpg,image/jpeg,image/png"
        ref={inputRef}
      />
    </div>
  );
};

export default UpdateAvatar;
