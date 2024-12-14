import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cva } from 'class-variance-authority';

const menuItemsVariants = cva('cursor-pointer body-l py-4 px-3 hover:bg-surf-cont-highest transition-colors outline-none', {
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
});

type MenuItem = {
  label: string;
  onSelect: () => void;
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
      {trigger && <DropdownMenu.Trigger className="outline-none">{trigger}</DropdownMenu.Trigger>}
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="py-2 bg-surf-cont elevation-2 rounded z-20" {...contentProps}>
          {items.map(item => (
            <DropdownMenu.Item
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
              className={menuItemsVariants({ itemSize })}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
