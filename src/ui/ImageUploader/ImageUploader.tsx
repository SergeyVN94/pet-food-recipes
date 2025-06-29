'use client';

import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { IconClose, IconLoader10, IconLoader20, IconLoader40, IconLoader60, IconLoader80, IconLoader90, IconReplay } from '@/assets/icons';
import { RecipeImageDto } from '@/types';
import { ButtonIcon } from '@/ui';
import { cn, showToast } from '@/utils';

/* eslint-disable @next/next/no-img-element */

const getErrorMessage = (error: AxiosError<{ message: string }>) => {
  if (error.status === 400) {
    if (error.response?.data.message === 'TOO_MANY_IMAGES') {
      return 'Максимум 10 файлов';
    }
  }

  return 'Что-то пошло не так';
};

type ImageUploaderProps = {
  file: File;
  uploadFile: (file: File, config: AxiosRequestConfig) => Promise<any>;
  onDelete?: () => void;
  onUpload?: (image: RecipeImageDto) => void;
  onError?: (error: AxiosError<any>) => void;
  className?: string;
};

const ImageUploader = ({ file, uploadFile, className, onUpload, onDelete, onError }: ImageUploaderProps) => {
  const [progress, setProgress] = React.useState(0);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const { data, error, mutate, isPending, isSuccess, reset } = useMutation({
    mutationKey: ['images', 'upload', file.name],
    mutationFn: async ({ file, config }: { file: File; config: AxiosRequestConfig }) => (await uploadFile(file, config)).data,
    onSuccess: onUpload,
    onError: (error: AxiosError<{ message: string }>) => {
      onError?.(error);
    },
  });

  const upload = () => {
    if (isPending || isSuccess || data) {
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    mutate({
      file,
      config: {
        onUploadProgress: ev => {
          setProgress(Math.round((ev.loaded * 100) / ev.total!));
        },
        signal: abortControllerRef.current.signal,
      },
    });
  };

  React.useEffect(() => {
    upload();

    return () => abortControllerRef.current?.abort();
  }, []);

  return (
    <div
      className={cn('flex flex-nowrap items-center gap-2 relative rounded-2xl', className, {
        'pointer-progress': isPending,
        'outline-error outline-2 outline-offset-2': error,
      })}
    >
      <div className="absolute top-0 right-0 flex flex-col">
        {onDelete && <ButtonIcon type="button" icon={IconClose} onClick={onDelete} variant="filled" />}
        {error && <ButtonIcon type="button" icon={IconReplay} onClick={upload} variant="filled" />}
      </div>
      {error && (
        <p className="absolute top-auto left-1/2 bottom-1 transform -translate-x-1/2 -translate-y-1/2 text-error body-m bg-primary-container rounded p-1 line-clamp-4 w-[90%] text-center">
          {getErrorMessage(error)}
        </p>
      )}
      <img src={URL.createObjectURL(file)} alt="" className="w-44 h-64 object-cover rounded-2xl" />
      {isPending && (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container body-m whitespace-nowrap">
          {progress <= 10 && <IconLoader10 />}
          {progress > 10 && progress <= 20 && <IconLoader20 />}
          {progress > 20 && progress <= 40 && <IconLoader40 />}
          {progress > 40 && progress <= 60 && <IconLoader60 />}
          {progress > 60 && progress <= 80 && <IconLoader80 />}
          {progress > 80 && <IconLoader90 />}
          {progress}%
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
