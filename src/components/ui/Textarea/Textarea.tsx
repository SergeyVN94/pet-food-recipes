'use client';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { IconCancel } from '@/assets/icons';

import { ButtonIcon } from '../ButtonIcon';
import { labelVariants, wrapVariants } from '../Input/Input.lib';
import { TextareaVariantProps, updateTextareaHeight } from './Textarea.lib';

type TextareaProps = {
  label?: string;
  subText?: string;
  className?: string;
  maxRows?: number;
  maxLength?: number;
  required?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  onClear?: () => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
  Omit<TextareaVariantProps, 'focus'>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, label, subText, maxRows, onChange, onClear, className = '', ...other }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const buttonClearRef = React.useRef<HTMLButtonElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ev => {
      const nextValue = ev.target.value;

      if (buttonClearRef.current) {
        buttonClearRef.current.style.display = nextValue ? '' : 'none';
      }

      if (onChange) {
        onChange(ev, nextValue);
      }
    };

    const handleRootClick = () => {
      localRef.current?.focus();
    };

    const handleClear = () => {
      if (localRef.current) {
        labelRef.current!.setAttribute('data-focus', 'false');
        localRef.current.style.height = '';
      }

      if (onClear) {
        onClear();

        if (localRef.current) {
          updateTextareaHeight(localRef.current);
        }
      }
    };

    React.useEffect(() => {
      const handleChange = () => {
        if (localRef.current) {
          labelRef.current?.setAttribute('data-focus', (!!localRef.current.value).toString());
        }
      };

      const inputEl = localRef.current;
      inputEl?.addEventListener('change', handleChange);

      return () => {
        inputEl?.removeEventListener('change', handleChange);
      };
    }, []);

    React.useEffect(() => {
      labelRef.current?.setAttribute('data-focus', (!!(other.value || other.placeholder)).toString());

      if (buttonClearRef.current) {
        buttonClearRef.current.style.display = other.value ? '' : 'none';
      }
    }, [other.value, other.placeholder]);

    React.useEffect(() => {
      const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = ev.target;

        if (!textarea) {
          return;
        }

        updateTextareaHeight(textarea);
      };

      const textarea = localRef.current;
      textarea?.addEventListener('input', handleChange as any);

      return () => {
        textarea?.removeEventListener('input', handleChange as any);
      };
    }, []);

    React.useEffect(() => {
      if (localRef.current) {
        updateTextareaHeight(localRef.current);
      }
    }, [maxRows]);

    return (
      <div className={className}>
        <div className={wrapVariants({ variant })} onClick={handleRootClick}>
          <label className="flex-1">
            <textarea
              className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 mt-4 resize-none block overflow-y-auto"
              {...other}
              rows={other.rows ?? 3}
              data-max-rows={maxRows}
              value={other.value ?? ''}
              onChange={handleChange}
              ref={mergeRefs([ref, localRef])}
            />
            {label && (
              <span className={labelVariants({ variant })} ref={labelRef}>
                {label}
                {other.maxLength && (
                  <span className="text-on-surface-var">
                    &nbsp;({String(other.value ?? '').length}/{other.maxLength})
                  </span>
                )}
                {other.required && <span className="text-error">&nbsp;*</span>}
              </span>
            )}
          </label>
          <ButtonIcon onClick={handleClear} type="button" ref={buttonClearRef}>
            <IconCancel />
          </ButtonIcon>
        </div>
        {subText && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

type TextareaControlledProps = Omit<TextareaProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
  isClearable?: boolean;
};

export const TextareaControlled = ({ isClearable = true, ...other }: TextareaControlledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(other.name);

    if (other.onClear) {
      other.onClear();
    }
  };

  return (
    <Controller
      name={other.name}
      control={methods.control}
      render={({ field }) => (
        <Textarea
          {...other}
          onChange={(ev, value) => field.onChange(value)}
          onBlur={field.onBlur}
          value={field.value}
          onClear={handleClear}
        />
      )}
    />
  );
};

export default Textarea;
