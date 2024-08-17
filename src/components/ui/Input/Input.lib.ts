import { type VariantProps, cva } from 'class-variance-authority';

export const wrapVariants = cva('group outline-none flex flex-nowrap items-start transition-all', {
  variants: {
    variant: {
      filled:
        'cursor-text py-1 pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surface hover:bg-on-surface/10 focus-within:after:h-0.5 focus-within:after:bg-primary data-[icon-left="true"]:pl-1',
      outline:
        'py-1 pl-4 outline outline-1 -outline-offset-1 outline-outline rounded min-h-[3.5rem] hover:outline-on-surface focus-within:outline-primary hover:focus-within:outline-primary focus-within:outline-[3px] focus-within:-outline-offset-[3px] data-[icon-left="true"]:pl-0',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const labelVariants = cva('text-on-surface-var !body-l absolute transition-all peer-focus:text-primary', {
  variants: {
    variant: {
      filled:
        'hover:text-primary top-4 left-4 group-hover:text-on-surface-var peer-focus:top-1 peer-focus:body-s peer-focus:text-xs peer-placeholder-shown:text-primary peer-placeholder-shown:top-1 peer-placeholder-shown:body-s peer-placeholder-shown:text-xs data-[focus="true"]:text-primary data-[focus="true"]:top-1 data-[focus="true"]:body-s data-[focus="true"]:text-xs data-[force-focus="true"]:text-primary data-[force-focus="true"]:top-1 data-[force-focus="true"]:body-s data-[force-focus="true"]:text-xs data-[icon-left="true"]:left-[53px]',
      outline: 'px-1 bg-surface left-3 -top-0.5 -translate-y-1/2 group-hover:text-on-surface',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export const inputVariants = cva('peer w-full outline-none bg-transparent body-l text-on-surface pr-4', {
  variants: {
    variant: {
      filled: 'data-[with-label=false]:mt-3 mt-5',
      outline: 'mt-3 group-hover:text-on-surface',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

export type InputVariantProps = VariantProps<typeof wrapVariants>;

export const updateTextareaHeight = (textarea: HTMLTextAreaElement) => {
  const maxRows = Number(textarea.getAttribute('data-max-rows'));
  const minRows = Number(textarea.getAttribute('rows'));

  textarea.style.height = 'auto';

  const rowHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
  const minHeight = Number.isNaN(minRows) ? rowHeight : minRows * rowHeight;
  const maxHeight = Number.isNaN(maxRows) || maxRows === 0 ? Infinity : maxRows * rowHeight;

  let nextHeight = textarea.scrollHeight;

  if (nextHeight < minHeight && Number.isNaN(rowHeight)) {
    nextHeight = minHeight;
  }

  if (nextHeight > maxHeight) {
    nextHeight = maxHeight;
  }

  textarea.style.height = nextHeight + 'px';
};
