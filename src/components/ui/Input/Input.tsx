'use client';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { IconCancel } from '@/assets/icons';

import { ButtonIcon } from '../ButtonIcon';
import { InputVariantProps, inputVariants, labelVariants, wrapVariants } from './Input.lib';
import { InputAutocompleteItem } from './Input.types';

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  isFocus?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  autocompleteItems?: InputAutocompleteItem[];
  errorMessage?: string;
  onAutoCompleteSelect?: (id: string) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
  onRightButtonClick?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<InputVariantProps, 'focus'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      label,
      subText,
      onChange,
      onClear,
      className = '',
      isFocus,
      iconRight,
      iconLeft,
      autocompleteItems,
      onFocus,
      onBlur,
      onAutoCompleteSelect,
      onRightButtonClick,
      errorMessage,
      ...other
    },
    ref,
  ) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const buttonClearRef = React.useRef<HTMLButtonElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
      const nextValue = ev.target.value;

      if (onChange && !other.readOnly) {
        onChange(ev, nextValue);
      }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = ev => {
      onFocus?.(ev);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = ev => {
      onBlur?.(ev);
    };

    const handleRootClick: React.MouseEventHandler<HTMLDivElement> = ev => {
      if (!(ev.target instanceof HTMLDivElement) || ev.target.getAttribute('data-type') !== 'root') {
        return;
      }

      localRef.current?.focus();
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = ev => {
      ev.stopPropagation();

      if (localRef.current) {
        labelRef.current?.setAttribute('data-focus', 'false');
        localRef.current.style.height = '';
      }

      if (buttonClearRef.current) {
        buttonClearRef.current.classList.add('hidden');
      }

      onClear?.();
    };

    const handleRightButtonClick: React.MouseEventHandler<HTMLButtonElement> = ev => {
      ev.stopPropagation();
      onRightButtonClick?.();
    };

    React.useEffect(() => {
      const handleChange = () => {
        if (localRef.current) {
          labelRef.current?.setAttribute('data-focus', Boolean(localRef.current.value).toString());
        }

        if (buttonClearRef.current && localRef.current) {
          if (localRef.current.value) {
            buttonClearRef.current.classList.remove('hidden');
          } else {
            buttonClearRef.current.classList.add('hidden');
          }
        }
      };

      const inputEl = localRef.current;
      inputEl?.addEventListener('input', handleChange);

      return () => {
        inputEl?.removeEventListener('input', handleChange);
      };
    }, []);

    React.useEffect(() => {
      if (buttonClearRef.current && other.value) {
        buttonClearRef.current?.classList.remove('hidden');
      }
    }, [other.value]);

    return (
      <div className={className}>
        <div
          className={wrapVariants({ variant, withError: !!errorMessage })}
          onClick={handleRootClick}
          data-icon-left={!!iconLeft}
          data-type="root"
        >
          {iconLeft &&
            React.cloneElement(iconLeft, {
              width: 48,
              height: 48,
              className: 'p-3',
            })}
          <label className="flex-1">
            <input
              className={inputVariants({ variant })}
              {...other}
              value={other.value ?? ''}
              onBlur={handleBlur}
              onFocus={handleFocus}
              data-with-label={!!label}
              onChange={handleChange}
              ref={mergeRefs([ref, localRef])}
            />
            {label && (
              <span
                className={labelVariants({ variant })}
                ref={labelRef}
                data-icon-left={!!iconLeft}
                data-force-focus={!!(other.value ?? '') || other.placeholder || isFocus}
              >
                {label}
              </span>
            )}
          </label>
          {onClear && (
            <ButtonIcon className="hidden" onClick={handleClear} type="button" ref={buttonClearRef} layoutSize={48}>
              <IconCancel />
            </ButtonIcon>
          )}
          {iconRight && (
            <ButtonIcon onClick={handleRightButtonClick} type="button">
              {iconRight}
            </ButtonIcon>
          )}
        </div>
        {subText && !errorMessage && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
        {errorMessage && <p className="pt-1 px-4 body-s text-error">{errorMessage}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

type InputUncontrolledProps = Omit<InputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
  isClearable?: boolean;
};

export const InputUncontrolled = ({ isClearable = true, ...other }: InputUncontrolledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    console.log('clear', other.name);

    methods.resetField(other.name);

    if (other.onClear) {
      other.onClear();
    }
  };

  return (
    <Controller
      name={other.name}
      control={methods.control}
      render={({ field, fieldState }) => (
        <Input
          {...other}
          onChange={(ev, value) => field.onChange(value)}
          onBlur={field.onBlur}
          value={field.value}
          onClear={handleClear}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
};

export default Input;
