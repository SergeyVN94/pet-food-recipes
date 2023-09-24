import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'outline-none text-center transition-all font-sans text-sm font-medium leading-5 tracking-tight',
  {
    variants: {
      variant: {
        filled:
          'rounded-full py-2.5 px-6 bg-primary text-on-primary hover:bg-opacity-[0.92] hover:shadow-md focus:opacity-[0.88] active::opacity-[0.88] disabled:bg-on-surface disabled:bg-opacity-[0.12] disabled:shadow-none disabled:cursor-not-allowed',
        outline:
          'rounded-full py-2.5 px-6 bg-transparent text-primary outline -outline-offset-2 outline-outline hover:bg-primary hover:bg-opacity-[0.08] focus:bg-primary focus:bg-opacity-[0.12] focus:outline-primary active::outline-outline active:bg-opacity-[0.12] disabled:text-on-surface disabled:bg-opacity-[0.12] disabled:cursor-not-allowed',
      },
      withIcon: {
        true: '',
        false: '',
      }
    },
    compoundVariants: [
      {
        variant: ['filled', 'outline'],
        withIcon: true,
        class: 'pl-4',
      }
    ],
    defaultVariants: {
      variant: 'filled',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'withIcon'> {
  iconLeft?: ReactNode;
}

const Button = ({
  className,
  variant,
  children,
  iconLeft,
  ...props
}: ButtonProps) => {
  return (
    <button
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
    </button>
  );
};
Button.displayName = 'Button';

export default Button;
