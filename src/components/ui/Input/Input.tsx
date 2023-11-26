'use client';

import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { ButtonIcon } from '../ButtonIcon';
import { IconCancel } from '@/assets/icons';

const wrapVariants = cva('group outline-none flex flex-nowrap items-center transition-colors', {
  variants: {
    variant: {
      filled:
        'cursor-text pt-1 pb-[0.1875rem] pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] border-on-surface border-b hover:bg-on-surface/10',
    },
    focus: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: ['filled'],
      focus: true,
      class: '!pb-0.5 border-b-2 border-primary',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    focus: false,
  },
});

const labelVariants = cva('transition-all', {
  variants: {
    variant: {
      filled: 'text-on-surface-var hover:text-primary !body-l absolute top-1/2 left-0 -translate-y-1/2 group-hover:text-on-surface-var',
    },
    focus: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: ['filled'],
      focus: true,
      class: '!text-primary !translate-y-0 !top-0 !body-s ',
    },
  ],
});

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  controlled?: boolean;
  onChange?: (value: string, ev: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<VariantProps<typeof wrapVariants>, 'focus'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, label, subText, controlled, onChange, className = '', ...other }, ref) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState('');
    const localRef = useRef<HTMLInputElement>(null);
    const methods = useFormContext();

    const handleFocus: FocusEventHandler<HTMLInputElement> = (ev) => {
      setFocus(true);

      if (other.onFocus) {
        other.onFocus(ev);
      }
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (ev) => {
      setFocus(false);

      if (other.onBlur) {
        other.onBlur(ev);
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
      const nextValue = ev.target.value;
      setValue(nextValue);

      if (controlled && other.name && methods) {
        methods.setValue(other.name, nextValue);
      }

      if (onChange) {
        onChange(nextValue, ev);
      }
    };

    const handleClear: MouseEventHandler = (ev) => {
      setValue('');

      if (localRef.current) {
        localRef.current.value = '';
      }

      if (controlled && other.name && methods) {
        methods.setValue(other.name, '');
      }

      if (onChange) {
        onChange('', ev as any);
      }
    };

    const handleRootClick = () => {
      localRef.current?.focus();
    };

    const registerProps = controlled && other.name ? methods.register(other.name) : { ref };

    return (
      <div className={className}>
        <div className={wrapVariants({ variant, focus: focus || !!value })} onClick={handleRootClick}>
          <label className="flex-1 relative">
            {label && <span className={labelVariants({ variant, focus: focus || !!value })}>{label}</span>}
            <input
              {...registerProps}
              {...other}
              ref={mergeRefs([ref, registerProps.ref, localRef])}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full outline-none bg-transparent body-l text-on-surface pr-4 pt-4"
            />
          </label>
          {value && (
            <ButtonIcon onClick={handleClear} type="button">
              <IconCancel />
            </ButtonIcon>
          )}
        </div>
        {subText && <p className="pt-1 px-4 body-s text-on-surface-var">{subText}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
