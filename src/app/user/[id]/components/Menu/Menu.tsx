'use client';

type MenuProps = {
  items: { title: string; id: string }[];
  onClick: (id: string) => void;
  selectedId: string;
};

const Menu = ({ items, onClick, selectedId }: MenuProps) => (
  <ul className="w-72 rounded-xl overflow-hidden">
    {items.map(item => (
      <li
        className="bg-surf-cont-low hover:bg-surf-cont-high transition-colors w-full data-[selected='true']:bg-surf-cont-highest"
        data-selected={selectedId === item.id}
        key={item.id}
      >
        <button
          className="py-2 px-4 max-w-full outline-none border-none body-l cursor-pointer text-left line-clamp-2 text-on-surface w-full "
          onClick={() => onClick(item.id)}
        >
          {item.title}
        </button>
      </li>
    ))}
  </ul>
);

export default Menu;
