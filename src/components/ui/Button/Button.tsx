import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full outline-none text-center text-white text-sm font-medium leading-tight tracking-tight py-2.5 px-6 transition-colors',
  {
    variants: {
      variant: {
        filled: 'bg-primary hover:bg-opacity-90 hover:shadow focus:bg-opacity-90 disabled:bg-neutral-90 disabled:shadow-none disabled:cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  className,
  variant,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {children}
    </button>
  );
};
Button.displayName = 'Button';

export default Button;
