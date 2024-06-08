'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui';
import { IconAdd, IconArrowBack } from '@/assets/icons';

type FilterPageProps = {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
};

const FilterPage = ({ title, children, className, isLoading }: FilterPageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBtnClick = () => {
    setIsOpen(true);
  };

  const handleCloseBtnClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={className}>
        {isLoading ? (
          <div className="skeleton w-[9.375rem] h-[2.75rem] cursor-progress rounded-full" />
        ) : (
          <Button iconLeft={<IconAdd className="w-6 h-6" />} onClick={handleOpenBtnClick}>
            {title}
          </Button>
        )}
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full translate-x-full transition-all z-0 flex flex-col items-stretch bg-white data-[open='true']:translate-x-0 data-[open='true']:z-20"
        data-open={String(isOpen)}
      >
        <Button iconLeft={<IconArrowBack className="w-6 h-6" />} onClick={handleCloseBtnClick} className="self-start">
          Назад
        </Button>
        <div className="flex-1 mt-4 bg-white flex flex-col max-h-[calc(100%-7rem)]">{children}</div>
      </div>
    </>
  );
};

export default FilterPage;
