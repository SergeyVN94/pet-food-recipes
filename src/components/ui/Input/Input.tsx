'use client';

import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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
  onAutoCompleteSelect?: (id: string) => void;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
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
      ...other
    },
    ref,
  ) => {
    const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
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

      if (autocompleteItems !== undefined) {
        setAutocompleteOpen(true);
      }
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = ev => {
      onBlur?.(ev);
    };

    const handleRootClick = () => {
      localRef.current?.focus();
      setAutocompleteOpen(true);
    };

    const handleClear = () => {
      if (localRef.current) {
        labelRef.current?.setAttribute('data-focus', 'false');
        localRef.current.style.height = '';
      }

      if (buttonClearRef.current) {
        buttonClearRef.current.classList.add('hidden');
      }

      if (onClear) {
        onClear();
      }
    };

    const handleOpenChange = (state: boolean) => {
      console.log('handleOpenChange', state);

      setAutocompleteOpen(state);
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
      <DropdownMenu.Root open={autocompleteOpen} onOpenChange={handleOpenChange} modal={false}>
        <div className={className}>
          <DropdownMenu.Trigger asChild>
            <div className={wrapVariants({ variant })} onClick={handleRootClick} data-icon-left={!!iconLeft}>
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
              {iconRight &&
                React.cloneElement(iconRight, {
                  width: 48,
                  height: 48,
                  className: 'p-3',
                })}
            </div>
          </DropdownMenu.Trigger>
          {subText && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="rounded py-2 bg-surf-cont-high max-w-80"
              align="start"
              onFocusOutside={ev => ev.preventDefault()}
              onMouseOver={ev => ev.preventDefault()}
            >
              <div className="max-h-[21rem] overflow-y-auto">
                {autocompleteItems?.length === 0 && (
                  <DropdownMenu.Item className="body-l py-2 px-3 cursor-default outline-none">Ничего не найдено</DropdownMenu.Item>
                )}
                {autocompleteItems?.map(item => (
                  <DropdownMenu.Item
                    className="flex items-center body-l py-1 px-3 transition-colors hover:bg-surf-cont-highest cursor-pointer outline-none focus:bg-surf-cont-highest line-clamp-2 h-14"
                    onClick={() => onAutoCompleteSelect?.(item.id)}
                    key={item.id}
                    onMouseOver={ev => ev.preventDefault()}
                  >
                    <p>{item.label}</p>
                  </DropdownMenu.Item>
                ))}
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </div>
      </DropdownMenu.Root>
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
      render={({ field }) => (
        <Input {...other} onChange={(ev, value) => field.onChange(value)} onBlur={field.onBlur} value={field.value} onClear={handleClear} />
      )}
    />
  );
};

export default Input;
