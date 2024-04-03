'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ButtonIcon } from '../ButtonIcon';
import { IconCancel } from '@/assets/icons';

import { labelVariants, wrapVariants, InputVariantProps } from './Input.lib';
import { mergeRefs } from 'react-merge-refs';

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  isFocus?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<InputVariantProps, 'focus'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, label, subText, onChange, onClear, className = '', isFocus, iconRight, iconLeft, ...other }, ref) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    const labelRef = React.useRef<HTMLSpanElement>(null);
    const buttonClearRef = React.useRef<HTMLButtonElement>(null);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
      const nextValue = ev.target.value;

      if (onChange) {
        onChange(ev, nextValue);
      }

      if (buttonClearRef.current && localRef.current) {
        buttonClearRef.current.style.opacity = localRef.current.value || other.value ? '1' : '0';
      }
    };

    const handleRootClick = () => {
      localRef.current?.focus();
    };

    const handleClear = () => {
      if (localRef.current) {
        labelRef.current?.setAttribute('data-focus', 'false');
        localRef.current.style.height = '';
      }

      if (buttonClearRef.current) {
        buttonClearRef.current.style.opacity = '0';
      }

      if (onClear) {
        onClear();
      }
    };

    React.useEffect(() => {
      const handleChange = () => {
        if (localRef.current) {
          labelRef.current?.setAttribute('data-focus', Boolean(localRef.current.value).toString());
        }
      };

      const inputEl = localRef.current;
      inputEl?.addEventListener('change', handleChange);

      return () => {
        inputEl?.removeEventListener('change', handleChange);
      };
    }, []);

    return (
      <div className={className}>
        <div className={wrapVariants({ variant })} onClick={handleRootClick} data-icon-left={!!iconLeft}>
          {iconLeft &&
            React.cloneElement(iconLeft, {
              width: 48,
              height: 48,
              className: 'p-3',
            })}
          <label className="flex-1 relative pt-1">
            <input
              className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 mt-4 data-[with-label=false]:mt-2"
              {...other}
              data-with-label={String(Boolean(label))}
              onChange={other.readOnly ? undefined : handleChange}
              ref={mergeRefs([ref, localRef])}
            />
            {label && (
              <span
                className={labelVariants({ variant })}
                ref={labelRef}
                data-force-focus={Boolean(String(other.value ?? '') || other.placeholder || isFocus)}
              >
                {label}
              </span>
            )}
          </label>
          {onClear && (
            <ButtonIcon className="opacity-0" onClick={handleClear} type="button" ref={buttonClearRef}>
              <IconCancel />
            </ButtonIcon>
          )}
          {iconRight &&
            React.cloneElement(iconRight, {
              width: 48,
              height: 48,
              className: 'p-3',
            })}
        </div>
        {subText && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

type InputControlledProps = Omit<InputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
  isClearable?: boolean;
};

export const InputControlled = ({ isClearable = true, ...other }: InputControlledProps) => {
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
        <Input {...other} onChange={(ev, value) => field.onChange(value)} onBlur={field.onBlur} value={field.value} onClear={handleClear} />
      )}
    />
  );
};

export default Input;
