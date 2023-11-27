'use client';

import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { ButtonIcon } from '../ButtonIcon';
import { IconCancel } from '@/assets/icons';

const wrapVariants = cva('group outline-none flex flex-nowrap items-center transition-colors', {
  variants: {
    variant: {
      filled:
        'cursor-text pt-1 pb-[0.1875rem] pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] border-on-surface border-b hover:bg-on-surface/10 focus-within:pb-0.5 focus-within:border-b-2 focus-within:border-primary',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const labelVariants = cva('transition-all', {
  variants: {
    variant: {
      filled:
        'text-on-surface-var hover:text-primary !body-l absolute top-1/2 left-0 -translate-y-1/2 group-hover:text-on-surface-var peer-focus:text-primary peer-focus:translate-y-0 peer-focus:top-0 peer-focus:body-s data-[focus="true"]:text-primary data-[focus="true"]:translate-y-0 data-[focus="true"]:top-0 data-[focus="true"]:body-s',
    },
  },
});

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>, value: string) => void;
  onClear?: () => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<VariantProps<typeof wrapVariants>, 'focus'>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ variant, label, subText, onChange, onClear, className = '', ...other }, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const nextValue = ev.target.value;

    if (onChange) {
      onChange(ev, nextValue);
    }
  };

  const handleRootClick = () => {
    localRef.current?.focus();
  };

  const handleClear = () => {
    labelRef.current?.setAttribute('data-focus', 'false');

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
    labelRef.current?.setAttribute('data-focus', (!!other.value).toString());
  }, [other.value]);

  return (
    <div className={className}>
      <div className={wrapVariants({ variant })} onClick={handleRootClick}>
        <label className="flex-1 relative">
          <input
            className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 pt-4"
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
        <ButtonIcon onClick={handleClear} type="button">
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
  };

  return <Input {...methods.register(props.name)} {...props} onClear={handleClear} />;
};

export default Input;
