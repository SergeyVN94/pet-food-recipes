'use client';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { IconCancel } from '@/assets/icons';
import { SVGIcon } from '@/types';

import { ButtonIcon } from '../ButtonIcon';
import { InputVariantProps, inputVariants, labelVariants, wrapVariants } from './Input.lib';
import { InputAutocompleteItem } from './Input.types';

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  isFocus?: boolean;
  iconLeft?: SVGIcon;
  iconRight?: SVGIcon;
  autocompleteItems?: InputAutocompleteItem[];
  errorMessage?: string;
  maxLength?: number;
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
      maxLength,
      value,
      ...other
    },
    ref,
  ) => {
    const localRef = React.useRef<HTMLInputElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
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

    const handleRightButtonClick: React.MouseEventHandler<HTMLButtonElement> = ev => {
      ev.stopPropagation();
      onRightButtonClick?.();
    };

    return (
      <div className={className}>
        <div
          className={wrapVariants({ variant, withError: Boolean(errorMessage) })}
          onClick={handleRootClick}
          data-icon-left={Boolean(iconLeft)}
          data-type="root"
        >
          {iconLeft &&
            React.createElement(iconLeft, {
              className: 'p-3 size-12',
            })}
          <label className="flex-1 relative py-1">
            <input
              className={inputVariants({ variant })}
              {...other}
              value={value ?? ''}
              data-label={Boolean(label)}
              data-value={Boolean(value)}
              onChange={handleChange}
              ref={mergeRefs([ref, localRef])}
            />
            {label && (
              <span
                className={labelVariants({ variant })}
                data-icon-left={Boolean(iconLeft)}
                data-focus={Boolean(value || other.placeholder || isFocus || other.type === 'number')}
              >
                {label}
                {maxLength && (
                  <span className="text-on-surface-var">
                    &nbsp;({String(value ?? '').length}/{maxLength})
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
          {iconRight && <ButtonIcon onClick={handleRightButtonClick} type="button" icon={iconRight} />}
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
