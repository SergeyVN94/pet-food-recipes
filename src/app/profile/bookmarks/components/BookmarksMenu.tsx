'use client';

import { BookmarkDto } from '@/types/bookmarks';

type BookmarksMenuProps = {
  bookmarks: BookmarkDto[];
  onClick: (slug: string) => void;
  selected: string;
};

const BookmarksMenu = ({ bookmarks, onClick, selected }: BookmarksMenuProps) => (
  <div className="w-72 rounded-xl overflow-hidden">
    {bookmarks?.map(bookmark => (
      <div
        className="bg-surf-cont-low hover:bg-surf-cont-high transition-colors w-full data-[selected='true']:bg-surf-cont-highest"
        data-selected={selected === bookmark.slug}
        key={bookmark.id}
      >
        <button
          className="py-2 px-4 max-w-full outline-none border-none body-l cursor-pointer text-left line-clamp-2 text-on-surface w-full "
          onClick={() => onClick(bookmark.slug)}
        >
          {bookmark.title}
        </button>
      </div>
    ))}
  </div>
);

export default BookmarksMenu;
