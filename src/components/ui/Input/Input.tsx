'use client';

import { ChangeEvent, ChangeEventHandler, TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { ButtonIcon } from '../ButtonIcon';
import { IconCancel } from '@/assets/icons';

import { labelVariants, wrapVariants, InputVariantProps } from './Input.lib';

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
} & Omit<TextareaHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<InputVariantProps, 'focus'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ variant, label, subText, onChange, onClear, className = '', ...other }, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const buttonClearRef = useRef<HTMLButtonElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
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
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    labelRef.current?.setAttribute('data-focus', (!!(other.value || other.placeholder)).toString());

    if (buttonClearRef.current) {
      buttonClearRef.current.style.display = other.value ? '' : 'none';
    }
  }, [other.value, other.placeholder]);

  return (
    <div className={className}>
      <div className={wrapVariants({ variant })} onClick={handleRootClick}>
        <label className="flex-1 relative pt-1">
          <input
            className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 mt-4"
            {...other}
            onChange={handleChange}
            ref={mergeRefs([ref, localRef])}
          />
          {label && (
            <span className={labelVariants({ variant })} ref={labelRef}>
              {label}
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
});
Input.displayName = 'Input';

type InputControlledProps = Omit<InputProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
};

export const InputControlled = (props: InputControlledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(props.name);

    if (props.onClear) {
      props.onClear();
    }
  };

  return <Input {...methods.register(props.name)} {...props} onClear={handleClear} />;
};

export default Input;
