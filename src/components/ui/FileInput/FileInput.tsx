'use client';

import { ChangeEvent, InputHTMLAttributes, MouseEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { cn, getNoun } from '@/lib/utils';
import { ButtonIcon } from '../ButtonIcon';
import { IconAdd, IconCancel } from '@/assets/icons';
import { Button } from '../Button';

type FileInputProps = {
  label?: string;
  className?: string;
  onClear?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ className, onClear, label = 'Выбрать файлы', ...props }, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
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

  useEffect(() => {
    const handleFocus = () => {
      labelRef.current?.setAttribute('data-focus', 'true');
    };

    const handleBlur = () => {
      labelRef.current?.setAttribute('data-focus', 'false');
    };

    const input = localRef.current;
    input?.addEventListener('focus', handleFocus);
    input?.addEventListener('blur', handleBlur);

    return () => {
      input?.removeEventListener('focus', handleFocus);
      input?.removeEventListener('blur', handleBlur);
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
        'min-w-xs outline-1 outline-dashed outline-primary rounded-2xl bg-primary-fixed-dim/10 cursor-pointer px-16 py-10 flex gap-3 items-center justify-center transition-colors hover:bg-primary-fixed-dim/40 data-[focus="true"]:outline-2 disabled:opacity-40 disabled:cursor-not-allowed',
        className,
      )}
      ref={labelRef}
    >
      <input
        {...props}
        className="block w-[1px] h-[1px] absolute -left-1 -right-1 opacity-0"
        ref={mergeRefs([localRef, ref])}
        type="file"
      />
      {selectedFiles === 0 && (
        <div className="flex flex-nowrap gap-4 items-center py-3">
          <IconAdd width={24} height={24} />
          <p className="title-s">{label}</p>
        </div>
      )}
      {selectedFiles > 0 && (
        <p className="label-l whitespace-nowrap">
          Выбрано {selectedFiles} {getNoun(selectedFiles, 'файл', 'файла', 'файлов')}
        </p>
      )}
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
