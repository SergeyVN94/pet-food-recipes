import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils';

const menuItemsVariants = cva(
  'cursor-pointer py-4 px-3 hover:bg-surf-cont-highest transition-colors outline-hidden flex flex-nowrap items-center gap-2',
  {
    variants: {
      itemSize: {
        sm: 'py-2 px-3',
        md: 'p-3',
        lg: 'py-4 px-3',
      },
    },
    defaultVariants: {
      itemSize: 'md',
    },
  },
);

type MenuItem = {
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type MenuProps = {
  items: MenuItem[];
  itemSize?: 'sm' | 'md' | 'lg';
  trigger?: React.ReactNode;
  rootProps?: React.ComponentProps<typeof DropdownMenu.Root>;
  contentProps?: React.ComponentProps<typeof DropdownMenu.Content>;
};

const Menu = ({ items, trigger, rootProps = {}, contentProps = {}, itemSize }: MenuProps) => {
  return (
    <DropdownMenu.Root {...rootProps}>
      {trigger && <DropdownMenu.Trigger className="outline-hidden">{trigger}</DropdownMenu.Trigger>}
      <DropdownMenu.Portal>
        <DropdownMenu.Content {...contentProps} className={cn('py-2 bg-surf-cont elevation-2 rounded-sm z-20', contentProps.className)}>
          {items.map(item => (
            <DropdownMenu.Item
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
              className={menuItemsVariants({ itemSize })}
            >
              {item.icon}
              <p className="body-l block">{item.label}</p>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
