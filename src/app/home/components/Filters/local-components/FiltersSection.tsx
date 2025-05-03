'use client';

import React from 'react';

import { IconAdd, IconArrowBack } from '@/assets/icons';
import { Button } from '@/ui';

type FiltersSectionProps = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};

const FiltersSection = ({ title, children, className, isLoading }: FiltersSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenBtnClick = () => {
    setIsOpen(true);
  };

  const handleCloseBtnClick = () => {
    setIsOpen(false);
  };

  return (
    <section className={className}>
      {isLoading ? (
        <div className="skeleton w-[9.375rem] h-[2.75rem] cursor-progress rounded-full" />
      ) : (
        <Button iconLeft={IconAdd} onClick={handleOpenBtnClick}>
          {title}
        </Button>
      )}
      <div
        className="absolute top-0 left-0 w-full h-[calc(100%-4rem)] overflow-y-auto translate-x-full transition-all z-0 bg-surface data-[open='true']:translate-x-0 data-[open='true']:z-20 flex flex-col p-4 pb-0"
        data-open={String(isOpen)}
      >
        <Button iconLeft={IconArrowBack} onClick={handleCloseBtnClick} className="self-start" variant="filled">
          Назад
        </Button>
        <div className="flex-1 mt-4 bg-inherit flex flex-col">{children}</div>
      </div>
    </section>
  );
};

export default FiltersSection;
