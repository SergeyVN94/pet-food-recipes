'use client';

import { ChangeEvent, ChangeEventHandler, TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';
import { ButtonIcon } from '../ButtonIcon';
import { IconCancel } from '@/assets/icons';

const wrapVariants = cva('group outline-none flex flex-nowrap items-start transition-all', {
  variants: {
    variant: {
      filled:
        'cursor-text py-1 pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surface  hover:bg-on-surface/10 focus-within:after:h-0.5 focus-within:after:bg-primary',
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
        'text-on-surface-var hover:text-primary !body-l absolute top-3 left-0 group-hover:text-on-surface-var peer-focus:text-primary peer-focus:top-1 peer-focus:body-s peer-focus:text-xs peer-placeholder-shown:text-primary peer-placeholder-shown:top-1 peer-placeholder-shown:body-s peer-placeholder-shown:text-xs data-[focus="true"]:text-primary data-[focus="true"]:top-1 data-[focus="true"]:body-s data-[focus="true"]:text-xs',
    },
  },
});

const updateTextareaHeight = (textarea: HTMLTextAreaElement) => {
  let maxRows = Number(textarea.getAttribute('maxrows'));

  if (Number.isNaN(maxRows) || maxRows < 1) {
    maxRows = 1;
  }

  textarea.style.height = 'auto';

  const rowHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
  const maxHeight = maxRows * rowHeight;
  const nextHeight = textarea.scrollHeight > maxHeight ? maxHeight : textarea.scrollHeight;

  textarea.style.height = nextHeight + 'px';
};

type InputProps = {
  label?: string;
  subText?: string;
  className?: string;
  maxRows?: number;
  onChange?: (ev: ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  onClear?: () => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
  Omit<VariantProps<typeof wrapVariants>, 'focus'>;

const Input = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ variant, label, subText, onChange, onClear, className = '', ...other }, ref) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const buttonClearRef = useRef<HTMLButtonElement>(null);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
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

    useEffect(() => {
      const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
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

    useEffect(() => {
      if (localRef.current) {
        updateTextareaHeight(localRef.current);
      }
    }, [other.maxRows]);

    return (
      <div className={className}>
        <div className={wrapVariants({ variant })} onClick={handleRootClick}>
          <label className="flex-1 relative pt-1">
            <textarea
              className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 mt-4 resize-none block overflow-x-hidden overflow-y-auto whitespace-nowrap"
              rows={other.rows ?? 1}
              wrap={!other.rows ? 'off' : undefined}
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
  },
);
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
