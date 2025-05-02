import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { IconClose } from '@/assets/icons';
import { SVGIcon } from '@/types';

export const variants = cva('inline-flex flex-nowrap items-center rounded-lg py-1.5 px-3 gap-2', {
  variants: {
    variant: {
      filled: '',
      outline: 'outline outline-outline -outline-offset-1 outline-1',
    },
    withLeftIcon: {
      true: 'pl-1.5',
      false: '',
    },
    withRightIcon: {
      true: 'pr-1.5',
      false: '',
    },
    color: {
      primary: 'bg-secondary-container text-on-secondary-container',
      error: 'bg-error-container text-on-error-container',
    },
  },
  defaultVariants: {
    variant: 'outline',
    color: 'primary',
  },
});

export type ChipProps = {
  label: string;
  tooltip?: string;
  iconLeft?: SVGIcon;
  disabled?: boolean;
  className?: string;
  onClose?: () => void;
} & VariantProps<typeof variants>;

const Chip = ({ label, variant, className, iconLeft, onClose, tooltip, color }: ChipProps) => {
  const content = (
    <div className={variants({ variant, className, withLeftIcon: !!iconLeft, withRightIcon: !!onClose, color })}>
      {iconLeft &&
        React.cloneElement(iconLeft, {
          className: 'size-[18px] text-primary',
        })}
      <p className="label-l whitespace-nowrap truncate text-inherit">{label}</p>
      {onClose && (
        <button className="outline-hidden border-none bg-transparent block cursor-pointer" tabIndex={-1} onClick={onClose}>
          <IconClose className="size-[18px]" />
        </button>
      )}
    </div>
  );

  // TODO: добавить tooltip
  return tooltip ? content : content;
};

export default Chip;
