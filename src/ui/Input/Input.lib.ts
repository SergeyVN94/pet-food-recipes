import { type VariantProps, cva } from 'class-variance-authority';

export const wrapVariants = cva('group outline-hidden flex flex-nowrap items-start transition-all', {
  variants: {
    variant: {
      filled:
        'cursor-text py-1 pl-4 relative bg-surf-cont-highest rounded-t after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surf hover:bg-on-surf/10 focus-within:after:h-0.5 focus-within:after:bg-primary data-[icon-left=true]:pl-0',
      outline:
        'py-1 pl-4 outline outline-solid -outline-offset-1 outline-outline-variant rounded-sm min-h-[3.5rem] hover:outline-on-surf focus-within:outline-primary hover:focus-within:outline-primary focus-within:outline-[3px] focus-within:-outline-offset-[3px] data-[icon-left=true]:pl-0',
    },
    withError: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      withError: true,
      class: 'bg-error-container',
    },
  ],
  defaultVariants: {
    variant: 'filled',
  },
});

export const labelVariants = cva('text-on-surf-variant body-l absolute transition-all peer-focus:text-primary', {
  variants: {
    variant: {
      filled:
        'absolute top-3 left-0 inline-block body-l group-hover:text-on-surf-variant peer-focus:top-1 peer-focus:body-s peer-placeholder-shown:text-primary peer-placeholder-shown:top-1 peer-placeholder-shown:body-s data-[focus=true]:text-primary data-[focus=true]:top-1 data-[focus=true]:body-s data-[icon-left=true]:left-[53px]',
      outline: 'px-1 bg-surf left-3 -top-0.5 -translate-y-1/2 group-hover:text-on-surf',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const inputVariants = cva(
  // ! autofill:shadow-[inset_0_0_0px_1000px_rgb(230,224,233)] - fix autofill background color
  'peer w-full outline-hidden bg-transparent body-l text-on-surf pr-4 autofill:shadow-[inset_0_0_0px_1000px_rgb(230,224,233)]',
  {
    variants: {
      variant: {
        filled: 'py-2 data-[label=true]:pt-4 data-[label=true]:pb-0',
        outline: 'mt-3 group-hover:text-on-surf',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
);

export type InputVariantProps = VariantProps<typeof wrapVariants>;
