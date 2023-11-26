import React, { ButtonHTMLAttributes, ReactComponentElement, cloneElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva(
  'p-2 border-transparent rounded-full transition-all block group-disabled:cursor-not-allowed group-disabled:opacity-40',
  {
    variants: {
      variant: {
        standard:
          'text-on-surface-var group-hover:bg-on-surface-var/[0.08] group-focus:bg-on-surface-var/[0.12] group-active:bg-on-surface-var/[0.12] group-disabled:bg-transparent group-disabled:text-on-surface',
        filled:
          'text-primary bg-surf-cont-highest/70 group-hover:bg-surf-cont-highest/90 group-focus:bg-surf-cont-highest/95 group-active:bg-surf-cont-highest/95 group-disabled:bg-on-surface group-disabled:text-on-surface',
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  },
);

type ButtonIconProps = {
  children: ReactComponentElement<React.FC<React.SVGProps<SVGSVGElement>>>;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants>;

const ButtonIcon = ({ children, className, variant, ...other }: ButtonIconProps) => (
  <button className="p-1 group" {...other}>
    <span className={variants({ variant })}>
      {cloneElement(children, {
        width: 24,
        height: 24,
      })}
    </span>
  </button>
);

export default ButtonIcon;
