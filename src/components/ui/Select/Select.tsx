'use client';

import React, { useEffect } from 'react';

import * as SelectPrimitives from '@radix-ui/react-select';
import { useVirtualizer } from '@tanstack/react-virtual';
import debounce from 'lodash-es/debounce';
import { Controller, useFormContext } from 'react-hook-form';

import { IconArrowLeft, IconSearch } from '@/assets/icons';
import { cn } from '@/utils/utils';

import { Input } from '../Input';

export type SelectItem = {
  id: string;
  label: string;
};

type SelectProps = {
  ariaLabel?: string;
  label?: string;
  className?: string;
  items: SelectItem[];
  name: string;
  value?: SelectItem['id'];
  error?: string;
  onChange: (id: SelectItem['id']) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const Select = ({ ariaLabel, items, value, error, label, name, className, onChange, onBlur, onFocus }: SelectProps) => {
  const selectedItemLabel = React.useMemo(() => items.find(i => i.id === value)?.label, [items, value]);
  const [inputValue, setInputValue] = React.useState(selectedItemLabel ?? '');
  const [filter, setFilter] = React.useState(selectedItemLabel ?? '');
  const setFilterDebounced = React.useMemo(() => debounce(setFilter, 250), [setFilter]);
  const filteredItems = React.useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();
    return normalizedFilter.length > 0 ? items.filter(i => i.label.toLowerCase().includes(normalizedFilter)) : items;
  }, [filter, items]);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const itemsParentRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setInputValue(value);
    setFilterDebounced(value);
  };

  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => itemsParentRef.current,
    estimateSize: () => 56,
    getItemKey: (index: number) => filteredItems[index].id,
    onChange: instance => {
      console.log(instance.options);
    },
  });

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedItemLabel) {
      setInputValue('');
      setFilter('');
    }
  }, [selectedItemLabel]);

  return (
    <SelectPrimitives.Root onValueChange={onChange} onOpenChange={setIsOpen} open={isOpen} name={name} value={value}>
      <SelectPrimitives.Trigger
        className={cn(
          'outline-none w-full cursor-pointer py-1 pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surface  hover:bg-on-surface/10 focus:after:h-0.5 focus:after:bg-primary min-w-[10rem]',
          className,
        )}
        aria-label={ariaLabel}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {label && (
          <span
            data-focus={isOpen || !!value?.length}
            className='text-on-surface-var hover:text-primary !body-l whitespace-nowrap absolute top-4 left-4 group-hover:text-on-surface-var peer-focus:text-primary peer-focus:top-1 peer-focus:body-s peer-focus:text-xs peer-placeholder-shown:text-primary peer-placeholder-shown:top-1 peer-placeholder-shown:body-s peer-placeholder-shown:text-xs data-[focus="true"]:text-primary data-[focus="true"]:top-1 data-[focus="true"]:body-s data-[focus="true"]:text-xs transition-all overflow-ellipsis'
          >
            {label}
          </span>
        )}
        <span className="flex items-center w-full">
          <span className="body-l data-[label='true']:pt-3 whitespace-nowrap overflow-ellipsis" data-label={!!label}>
            {selectedItemLabel}
          </span>
          <IconArrowLeft
            className="ml-auto mr-3 -rotate-90 data-[open='true']:rotate-90 transition-all"
            data-open={isOpen}
            width={24}
            height={24}
          />
        </span>
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Portal>
        <SelectPrimitives.Content sideOffset={4} alignOffset={0} position="popper" autoFocus={false}>
          <SelectPrimitives.Viewport className="rounded-md bg-surf-cont flex flex-col w-full shadow-elevation-2" autoFocus={false}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              name={`select-search-${name}`}
              ref={searchInputRef}
              iconLeft={<IconSearch />}
            />
            {/* 21rem == 6 items */}
            <div className="max-h-[21rem] overflow-y-auto" ref={itemsParentRef}>
              <div className="w-full relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                {rowVirtualizer.getVirtualItems().map(virtualItem => (
                  <div
                    key={virtualItem.key}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <SelectPrimitives.Item
                      key={filteredItems[virtualItem.index].id}
                      className="px-3 py-4 w-full text-left hover:bg-surf-cont-highest transition-all body-l max-w-xs text-ellipsis select-none cursor-pointer focus:bg-surf-cont-high outline-none"
                      value={filteredItems[virtualItem.index].id}
                    >
                      <SelectPrimitives.ItemText>{filteredItems[virtualItem.index].label}</SelectPrimitives.ItemText>
                    </SelectPrimitives.Item>
                  </div>
                ))}
              </div>
            </div>
            {filteredItems.length === 0 && (
              <p className="px-3 py-4 w-full text-left hover:bg-surf-cont-highest transition-all body-l max-w-xs text-ellipsis select-none cursor-default focus:bg-surf-cont-high outline-none">
                Ничего не найдено
              </p>
            )}
          </SelectPrimitives.Viewport>
        </SelectPrimitives.Content>
      </SelectPrimitives.Portal>
    </SelectPrimitives.Root>
  );
};

type SelectUncontrolledProps = Omit<SelectProps, 'onChange' | 'value'>;

export const SelectUncontrolled = ({ ...other }: SelectUncontrolledProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={other.name}
      render={({ field }) => {
        const handleChange = (value: string) => {
          if (value.length > 0) {
            field.onChange(value);
          }
        };

        return <Select {...other} onChange={handleChange} value={field.value} onBlur={field.onBlur} />;
      }}
    />
  );
};

export default Select;
