'use client';

import { cva } from 'class-variance-authority';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastVariants = cva(
  'flex items-center px-4 min-h-12 rounded-lg cursor-pointer overflow-hidden bg-surface-dim shadow-md body-l mb-3 min-w-80',
  {
    variants: {
      variant: {
        success: 'text-green-500',
        error: 'text-red-500',
        info: 'text-blue-500',
        warning: 'text-orange-500',
        default: 'text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    {children}
    <ToastContainer
      transition={Slide}
      toastClassName={context => toastVariants({ variant: context?.type })}
      position="bottom-center"
      closeOnClick
      hideProgressBar
      theme="colored"
      closeButton={false}
    />
  </>
);

export default ToastProvider;
