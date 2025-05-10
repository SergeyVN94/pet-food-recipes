import React from 'react';

import { SVGIcon } from '@/types';
import { cn } from '@/utils';

export type Tab = {
  id: string;
  label: string;
  icon?: SVGIcon;
};

type TabsProps = {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  className?: string;
};

const Tabs = ({ tabs, activeTabId, onTabClick, className }: TabsProps) => (
  <div className={cn('inline-flex flex-nowrap items-center border-b border-outline-variant', className)}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        className='outline-hidden bg-transparent block cursor-pointer text-on-surface-var label-l border-solid border-b-2 border-transparent data-[active="true"]:border-primary data-[active="true"]:text-on-surface px-4 pt-3.5 pb-3 transition-colors min-w-32'
        onClick={() => onTabClick(tab.id)}
        data-active={tab.id === activeTabId}
      >
        <span className="flex flex-nowrap items-center justify-center gap-2 w-full">
          {tab.icon && React.createElement(tab.icon, { className: 'size-6' })}
          {tab.label}
        </span>
      </button>
    ))}
  </div>
);

export default Tabs;
