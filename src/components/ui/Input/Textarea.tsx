'use client';

import { ChangeEvent, ChangeEventHandler, TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';

import { useFormContext } from 'react-hook-form';
import { mergeRefs } from 'react-merge-refs';

import { IconCancel } from '@/assets/icons';

import { ButtonIcon } from '../ButtonIcon';
import { InputVariantProps, labelVariants, updateTextareaHeight, wrapVariants } from './Input.lib';

type TextareaProps = {
  label?: string;
  subText?: string;
  className?: string;
  maxRows?: number;
  onChange?: (ev: ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  onClear?: () => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
  Omit<InputVariantProps, 'focus'>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, label, subText, maxRows, onChange, onClear, className = '', ...other }, ref) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const buttonClearRef = useRef<HTMLButtonElement>(null);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ev => {
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
    }, [maxRows]);

    return (
      <div className={className}>
        <div className={wrapVariants({ variant })} onClick={handleRootClick}>
          <label className="flex-1 relative pt-1">
            <textarea
              className="peer w-full outline-none bg-transparent body-l text-on-surface pr-4 mt-4 resize-none block overflow-y-auto"
              rows={other.rows ?? 3}
              data-max-rows={maxRows}
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
Textarea.displayName = 'Textarea';

type TextareaControlledProps = Omit<TextareaProps, 'onChange' | 'value' | 'onBlur' | 'onFocus' | 'name'> & {
  name: string;
};

export const TextareaControlled = (props: TextareaControlledProps) => {
  const methods = useFormContext();

  const handleClear = () => {
    methods.resetField(props.name);
  };

  return <Textarea {...methods.register(props.name)} {...props} onClear={handleClear} />;
};

export default Textarea;
