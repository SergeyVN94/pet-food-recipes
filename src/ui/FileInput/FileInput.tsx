'use client';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { IconAdd, IconCancel } from '@/assets/icons';
import { showToast } from '@/utils';
import { cn, humanFileSize } from '@/utils/utils';

import { ButtonIcon } from '../ButtonIcon';

type FileInputProps = {
  onChange: (files: File[]) => void;
  value?: File[];
  fileSizeLimit?: number;
  label?: string;
  className?: string;
  onClear?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'onChange'>;

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onClear, label = 'Выбрать файлы', onChange, value, fileSizeLimit = Infinity, ...props }, ref) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
      const files = Array.from(ev.target.files ?? []);

      const bigFile = files.find(file => file.size > fileSizeLimit);
      if (fileSizeLimit && bigFile) {
        showToast('error', `Файл «${bigFile.name}» больше чем ${humanFileSize(fileSizeLimit)}`);
        return;
      }

      onChange(files);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = ev => {
      setIsFocus(true);
      props.onFocus?.(ev);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = ev => {
      setIsFocus(false);
      props.onBlur?.(ev);
    };

    return (
      <label
        className={cn(
          'min-w-xs outline-1 outline-dashed outline-primary rounded-2xl bg-primary-fixed-dim/10 cursor-pointer px-16 py-10 flex gap-3 items-center justify-center transition-colors hover:bg-primary-fixed-dim/40 data-[focus="true"]:outline-2 disabled:opacity-40 disabled:cursor-not-allowed text-primary',
          className,
        )}
        data-focus={isFocus}
      >
        <input
          {...props}
          className="block w-[1px] h-[1px] absolute -left-1 -right-1 opacity-0"
          ref={ref}
          type="file"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center">
          <div className="flex flex-nowrap gap-4 items-center py-3">
            <IconAdd width={24} height={24} />
            <p className="title-s">{label}</p>
          </div>
          {fileSizeLimit < Infinity && <p className="title-s inline-block">Не более {humanFileSize(fileSizeLimit)}</p>}
        </div>
        {onClear && value && value.length > 0 && <ButtonIcon variant="standard" onClick={onClear} type="button" icon={IconCancel} />}
      </label>
    );
  },
);
FileInput.displayName = 'FileInput';

type InputUncontrolledProps = Omit<FileInputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
};

export const FileInputUncontrolled = (props: InputUncontrolledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(props.name);

    if (props.onClear) {
      props.onClear();
    }
  };

  return (
    <Controller
      name={props.name}
      control={methods.control}
      render={({ field }) => (
        <FileInput onChange={field.onChange} value={field.value} onBlur={field.onBlur} onClear={handleClear} {...props} />
      )}
    />
  );
};

export default FileInput;
