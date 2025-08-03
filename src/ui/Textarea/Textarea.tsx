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
  isFocus?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  onClear?: () => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
  Omit<TextareaVariantProps, 'focus'>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, label, subText, maxRows, onChange, onClear, className = '', value, isFocus, ...other }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ev => {
      const nextValue = ev.target.value;

      if (onChange && !other.readOnly) {
        onChange(ev, nextValue);
      }
    };

    const handleRootClick: React.MouseEventHandler<HTMLDivElement> = ev => {
      if (!(ev.target instanceof HTMLDivElement) || ev.target.getAttribute('data-type') !== 'root') {
        return;
      }

      localRef.current?.focus();
    };

    const handleClearButtonClick: React.MouseEventHandler<HTMLButtonElement> = ev => {
      ev.stopPropagation();
      onClear?.();
    };

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
          <label className="flex-1 relative py-1">
            <textarea
              className="peer w-full outline-hidden bg-transparent body-l text-on-surf pr-4 mt-4 resize-none block overflow-y-auto"
              {...other}
              data-label={Boolean(label)}
              data-value={Boolean(value)}
              rows={other.rows ?? 3}
              data-max-rows={maxRows}
              value={value}
              onChange={handleChange}
              ref={mergeRefs([ref, localRef])}
            />
            {label && (
              <span className={labelVariants({ variant })} data-focus={Boolean(value || other.placeholder || isFocus)}>
                {label}
                {other.maxLength && (
                  <span className="text-on-surf-variant">
                    &nbsp;({String(value ?? '').length}/{other.maxLength})
                  </span>
                )}
                {other.required && <span className="text-error">&nbsp;*</span>}
              </span>
            )}
          </label>
          {onClear && (
            <ButtonIcon
              className="data-[value='false']:hidden"
              onClick={handleClearButtonClick}
              type="button"
              layoutSize={48}
              icon={IconCancel}
              data-value={Boolean(value)}
            />
          )}
        </div>
        {subText && <p className="pt-1 px-4 body-s text-on-surf-variant">{subText}</p>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

type TextareaUncontrolledProps = Omit<TextareaProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
  isClearable?: boolean;
};

export const TextareaUncontrolled = ({ isClearable = true, ...other }: TextareaUncontrolledProps) => {
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
