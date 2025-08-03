import { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

import { SVGIcon } from '@/types';

const buttonVariants = cva(
  'rounded-full outline-hidden text-center transition-all font-sans text-sm font-medium leading-5 tracking-tight disabled:cursor-not-allowed disabled:opacity-40 inline-block whitespace-nowrap',
  {
    variants: {
      variant: {
        filled:
          'py-2.5 px-6 bg-primary text-on-primary hover:bg-opacity/92 hover:shadow-md focus-visible:opacity-[0.88] active::opacity-[0.88] disabled:bg-on-surf disabled:bg-opacity/12 disabled:shadow-none disabled:text-on-surf',
        outline:
          'py-2.5 px-6 bg-transparent text-primary outline -outline-offset-2 outline-outline hover:bg-primary/[0.08] focus-visible:bg-primary/[0.12] focus-visible:outline-primary active::outline-outline active:bg-opacity/12 disabled:text-on-surf disabled:bg-transparent',
        text: 'bg-transparent py-2.5 px-3 outline-hidden text-primary hover:bg-primary/[0.08] focus-visible:bg-primary/[0.12] active:bg-primary/[0.12] disabled:text-on-surf disabled:bg-transparent',
        elevated:
          'py-2.5 px-6 text-primary bg-surf-cont-low shadow-elevation-1 hover:bg-primary/[0.08] focus-visible:bg-primary/[0.12] active:bg-primary/[0.12] disabled:bg-on-surf/[0.12] disabled:text-on-surf disabled:shadow-none',
        tonal:
          'py-2.5 px-6 bg-secondary-container text-on-secondary-container hover:secondary-container/[0.08] hover:shadow-elevation-1 focus-visible:secondary-container/[0.12] active:secondary-container/[0.12] disabled:bg-on-surf/[0.12] disabled:text-on-surf disabled:shadow-none',
      },
      withIcon: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: ['filled', 'outline', 'elevated', 'tonal'],
        withIcon: true,
        class: 'pl-4',
      },
      {
        variant: ['text'],
        withIcon: true,
        class: 'pr-4',
      },
    ],
    defaultVariants: {
      variant: 'filled',
    },
  },
);

export type ButtonProps = ({
  iconLeft?: SVGIcon;
} & Omit<VariantProps<typeof buttonVariants>, 'withIcon'>) &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, variant, children, iconLeft, ...props }: ButtonProps) => (
  <button
    className={buttonVariants({
      variant,
      className,
      withIcon: !!iconLeft,
    })}
    {...props}
  >
    <span className="flex flex-nowrap items-center justify-center gap-2">
      {iconLeft && React.createElement(iconLeft, { className: 'w-[1.125rem] text-current' })}
      {children}
    </span>
  </button>
);
Button.displayName = 'Button';

export type ButtonLinkProps = ({
  iconLeft?: ReactNode;
} & Omit<VariantProps<typeof buttonVariants>, 'withIcon'>) &
  ComponentProps<typeof Link>;

export const ButtonLink = ({ className, variant, children, iconLeft, ...props }: ButtonLinkProps) => (
  <Link
    className={buttonVariants({
      variant,
      className,
      withIcon: !!iconLeft,
    })}
    {...props}
  >
    <span className="flex flex-nowrap items-center justify-center gap-2">
      {iconLeft}
      {children}
    </span>
  </Link>
);
Button.displayName = 'Button';

export default Button;
