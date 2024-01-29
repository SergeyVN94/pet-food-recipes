'use client';

import { ChangeEvent, InputHTMLAttributes, MouseEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { cn, getNoun } from '@/lib/utils';
import { ButtonIcon } from '../ButtonIcon';
import { IconAdd, IconCancel } from '@/assets/icons';

type FileInputProps = {
  className?: string;
  onClear?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ className, onClear, ...props }, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState(0);

  useEffect(() => {
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
      setSelectedFiles(ev.target.files?.length ?? 0);
    };

    const input = localRef.current;
    input?.addEventListener('input', handleChange as any);

    return () => {
      input?.removeEventListener('input', handleChange as any);
    };
  }, []);

  const handleClear = (ev: MouseEvent) => {
    ev.preventDefault();

    setSelectedFiles(0);

    if (onClear) {
      onClear();
    }
  };

  return (
    <label
      className={cn(
        'max-w-xs border border-primary border-dashed cursor-pointer px-16 py-10 flex gap-3 items-center justify-center',
        className,
      )}
    >
      <input
        {...props}
        className="block w-[1px] h-[1px] absolute -left-1 -right-1 opacity-0"
        ref={mergeRefs([localRef, ref])}
        type="file"
      />
      <ButtonIcon variant="filled">
        <IconAdd />
      </ButtonIcon>
      <p className="label-l whitespace-nowrap">
        Выбрано {selectedFiles} {getNoun(selectedFiles, 'файл', 'файла', 'файлов')}
      </p>
      {onClear && selectedFiles > 0 && (
        <ButtonIcon variant="standard" onClick={handleClear} type="button">
          <IconCancel />
        </ButtonIcon>
      )}
    </label>
  );
});
FileInput.displayName = 'FileInput';

type InputControlledProps = Omit<FileInputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
};

export const FileInputControlled = (props: InputControlledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(props.name);

    if (props.onClear) {
      props.onClear();
    }
  };

  return <FileInput {...methods.register(props.name)} onClear={handleClear} {...props} />;
};

export default FileInput;
