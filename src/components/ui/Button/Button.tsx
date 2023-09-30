import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded-full outline-none text-center transition-all font-sans text-sm font-medium leading-5 tracking-tight disabled:cursor-not-allowed disabled:opacity-40',
  {
    variants: {
      variant: {
        filled:
          'py-2.5 px-6 bg-primary text-on-primary hover:bg-opacity-[0.92] hover:shadow-md focus:opacity-[0.88] active::opacity-[0.88] disabled:bg-on-surface disabled:bg-opacity-[0.12] disabled:shadow-none disabled:text-on-surface',
        outline:
          'py-2.5 px-6 bg-transparent text-primary outline -outline-offset-2 outline-outline hover:bg-primary/[0.08] focus:bg-primary/[0.12] focus:outline-primary active::outline-outline active:bg-opacity-[0.12] disabled:text-on-surface disabled:bg-transparent',
        text: 'bg-transparent py-2.5 px-3 outline-none text-primary hover:bg-primary/[0.08] focus:bg-primary/[0.12] active:bg-primary/[0.12] disabled:text-on-surface disabled:bg-transparent',
        elevated:
          'py-2.5 px-6 text-primary bg-surf-cont-low shadow-elevation-1 hover:bg-primary/[0.08] focus:bg-primary/[0.12] active:bg-primary/[0.12] disabled:bg-on-surface/[0.12] disabled:text-on-surface disabled:shadow-none',
        tonal:
          'py-2.5 px-6 bg-secondary-container text-on-secondary-container hover:secondary-container/[0.08] hover:shadow-elevation-1 focus:secondary-container/[0.12] active:secondary-container/[0.12] disabled:bg-on-surface/[0.12] disabled:text-on-surface disabled:shadow-none',
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
