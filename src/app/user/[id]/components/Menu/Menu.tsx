'use client';

import { cn } from '@/utils';

type MenuProps = {
  items: { title: string; id: string }[];
  onClick: (id: string) => void;
  selectedId: string;
  className?: string;
};

const Menu = ({ items, onClick, selectedId, className }: MenuProps) => (
  <ul className={cn('w-72', className)}>
    {items.map(item => (
      <li
        className="bg-surf-cont-low hover:bg-surf-cont-high transition-colors w-full data-[selected='true']:bg-surf-cont-highest last:rounded-b-xl first:rounded-t-xl"
        data-selected={selectedId === item.id}
        key={item.id}
      >
        <button
          className="block py-2 px-4 max-w-full outline-hidden border-none body-l cursor-pointer text-left line-clamp-2 text-on-surface w-full truncate"
          onClick={() => onClick(item.id)}
        >
          {item.title}
        </button>
      </li>
    ))}
  </ul>
);

export default Menu;
