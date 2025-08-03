import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils';

import { Button, ButtonProps } from '../Button';

type BaseProps = { children: React.ReactNode; className?: string };

const ModalTitle = ({ children, className }: BaseProps) => (
  <Dialog.Title className={cn('headline-s text-on-surf mb-4', className)}>{children}</Dialog.Title>
);

const ModalText = ({ children, className }: BaseProps) => <p className={cn('body-m text-on-surf-variant mb-6', className)}>{children}</p>;

const ModalActionsWrapper = ({ children, className }: BaseProps) => (
  <div className={cn('flex justify-end gap-2 mt-6', className)}>{children}</div>
);

const ModalAction = ({ children, className, ...other }: BaseProps & Omit<ButtonProps, 'variant' | 'className'>) => (
  <Button variant="text" className={cn('min-w-16', className)} {...other}>
    {children}
  </Button>
);

const ModalActionClose = ({ children, className, ...other }: BaseProps & Omit<ButtonProps, 'variant' | 'className'>) => (
  <Dialog.Close asChild>
    <Button variant="text" className={cn('min-w-16', className)} {...other}>
      {children}
    </Button>
  </Dialog.Close>
);

const rootVariants = cva('rounded-xl p-6 bg-surf-dim mx-auto w-screen', {
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type ModalRootProps = BaseProps &
  React.ComponentProps<typeof Dialog.Root> & {
    trigger: React.ReactNode;
  } & VariantProps<typeof rootVariants>;

const ModalRoot = ({ children, trigger, className, size, ...other }: ModalRootProps) => (
  <Dialog.Root {...other}>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={rootVariants({ size })}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const Modal = {
  Root: ModalRoot,
  Title: ModalTitle,
  Text: ModalText,
  Actions: ModalActionsWrapper,
  Action: ModalAction,
  ActionClose: ModalActionClose,
};

export default Modal;
