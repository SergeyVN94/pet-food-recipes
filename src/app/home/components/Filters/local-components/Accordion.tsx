'use client';

import React from 'react';

import { IconArrowDropDown } from '@/assets/icons';

type AccordionProps = {
  label: string;
  children: React.ReactNode;
};

const Accordion = ({ children, label }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleButtonClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="py-3 flex flex-col">
      <button
        className="outline-hidden bg-transparent border-none w-full cursor-pointer data-[open='true']:mb-3"
        tabIndex={-1}
        onClick={handleButtonClick}
        data-open={isOpen}
        type="button"
      >
        <p className="flex flex-nowrap items-center justify-between w-full">
          <span className="title-m">{label}</span>
          <IconArrowDropDown
            className='transition-transform rotate-0 data-[open="true"]:rotate-180 size-6 text-primary'
            data-open={isOpen}
          />
        </p>
      </button>
      <div className='flex flex-col flex-1 overflow-hidden max-h-0 transition-all data-[open="true"]:max-h-none' data-open={isOpen}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
