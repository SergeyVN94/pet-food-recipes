'use client';

import React from 'react';

import axios from 'axios';

import { IconFileUpload, IconImage } from '@/assets/icons';
import { useUpdateUserAvatar } from '@/hooks';
import { FileInput, ProgressBar } from '@/ui';
import { showToast } from '@/utils';

type UpdateAvatarProps = {
  className?: string;
};

const UpdateAvatar = ({ className }: UpdateAvatarProps) => {
  const [progress, setProgress] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { mutate, isPending, variables } = useUpdateUserAvatar({
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'FILE_SIZE_LIMIT') {
          showToast('error', 'Превышен размер файла. Не более 2MB');
        }
      }
    },
    onSuccess: () => {
      showToast('success', 'Аватар обновлен');
    },
    onSettled: () => {
      if (inputRef.current) {
        inputRef.current.type = 'text';
        inputRef.current.type = 'file';
      }

      setProgress(null);
    },
  });

  const handleFilesChange = (files: File[]) => {
    if (isPending) {
      return;
    }

    if (files && files?.length > 0) {
      mutate({
        avatar: files[0],
        axiosConfig: {
          onUploadProgress: ev => {
            setProgress(Math.round((ev.loaded * 100) / ev.total!));
          },
        },
      });
    }
  };

  return (
    <div className={className}>
      {progress !== null && variables?.avatar?.name && (
        <div className="flex flex-nowrap items-center mb-2.5 gap-2">
          <IconImage className="size-6 text-primary" />
          <p className="label-l text-primary max-w-44 truncate">{variables?.avatar?.name}</p>
          <ProgressBar value={50} className=" flex-1" />
          <p className="label-l text-primary font-bold">50%</p>
        </div>
      )}
      <FileInput
        className="w-full"
        onChange={handleFilesChange}
        label="Выберите изображение"
        accept="image/jpg,image/jpeg,image/png"
        ref={inputRef}
        fileSizeLimit={1024 * 1024 * 10}
      />
    </div>
  );
};

export default UpdateAvatar;
