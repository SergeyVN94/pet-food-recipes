'use client';

import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { IconClose, IconReplay } from '@/assets/icons';
import { ButtonIcon } from '@/ui';
import { cn } from '@/utils';

/* eslint-disable @next/next/no-img-element */

type ImageUploaderProps = {
  file: File;
  uploadFile: (file: File, config: AxiosRequestConfig) => Promise<any>;
  onCLose?: () => void;
  onUpload?: () => void;
  className?: string;
};

const ImageUploader = ({ file, uploadFile, className, onUpload, onCLose }: ImageUploaderProps) => {
  const [progress, setProgress] = React.useState(0);

  const { error, mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['image', 'upload', file.name],
    mutationFn: ({ file, config }: { file: File; config: AxiosRequestConfig }) => uploadFile(file, config),
    onSuccess: onUpload,
  });

  const upload = () => {
    if (isPending || isSuccess) {
      return;
    }

    mutate({
      file,
      config: {
        onUploadProgress: ev => {
          setProgress(Math.round((ev.loaded * 100) / ev.total!));
        },
      },
    });
  };

  React.useEffect(() => {
    upload();
  }, []);

  return (
    <div
      className={cn('flex flex-nowrap items-center gap-2 border border-transparent relative', className, {
        'pointer-progress': isPending,
        'border-error': error,
      })}
    >
      {onCLose && <ButtonIcon icon={IconClose} onClick={onCLose} className="absolute top-0 right-0" />}
      {error && (
        <ButtonIcon icon={IconReplay} onClick={upload} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      <img src={URL.createObjectURL(file)} alt="" className="w-32 h-32 object-cover" />
      {isPending && (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container body-m">
          {progress}%
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
