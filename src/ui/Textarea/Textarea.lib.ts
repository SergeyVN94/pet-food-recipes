import { type VariantProps, cva } from 'class-variance-authority';

import { wrapVariants } from '../Input/Input.lib';

export const textareaVariants = cva('peer w-full outline-hidden bg-transparent body-l text-on-surface pr-4', {
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

export type TextareaVariantProps = VariantProps<typeof wrapVariants>;

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
