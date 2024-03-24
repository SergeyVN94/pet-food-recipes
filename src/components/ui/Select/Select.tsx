'use client';

import React from 'react';
import * as SelectPrimitives from '@radix-ui/react-select';
import { useFormContext, Controller } from 'react-hook-form';
import debounce from 'lodash-es/debounce';

import { Input } from '../Input';
import { cn } from '@/lib/utils';
import { IconArrowLeft } from '@/assets/icons';

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
  const selectedItemLabel = React.useMemo(() => items.find((i) => i.id === value)?.label, [items, value]);
  const [inputValue, setInputValue] = React.useState(selectedItemLabel ?? '');
  const [filter, setFilter] = React.useState(selectedItemLabel ?? '');
  const setFilterDebounced = React.useMemo(() => debounce(setFilter, 250), [setFilter]);
  const filteredItems = React.useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();
    return normalizedFilter.length > 0 ? items.filter((i) => i.label.toLowerCase().includes(normalizedFilter)) : items;
  }, [filter, items]);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setInputValue(value);
    setFilterDebounced(value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }

    setIsOpen(isOpen);
  };

  return (
    <SelectPrimitives.Root onValueChange={onChange} onOpenChange={handleOpenChange} open={isOpen} name={name} value={value}>
      <SelectPrimitives.Trigger
        className={cn(
          'outline-none w-full cursor-pointer py-1 pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surface  hover:bg-on-surface/10 focus:after:h-0.5 focus:after:bg-primary',
          className,
        )}
        // aria-label={ariaLabel}
        // onFocus={onFocus}
        // onBlur={onBlur}
      >
        <span className="flex items-center w-full">
          <SelectPrimitives.Value className="body-l inline-block">{value}</SelectPrimitives.Value>
          <IconArrowLeft
            className="ml-auto mr-3 -rotate-90 data-[open='true']:rotate-90 transition-all"
            data-open={isOpen}
            width={24}
            height={24}
          />
        </span>
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Portal>
        <SelectPrimitives.Content sideOffset={4} alignOffset={0} position="popper">
          <SelectPrimitives.Viewport className="rounded-md bg-surf-cont flex flex-col w-full shadow-elevation-2">
            <Input value={inputValue} onChange={handleInputChange} name={`select-search-${name}`} ref={searchInputRef} />
            {/* 21rem == 6 items */}
            <div className="max-h-[21rem] overflow-y-auto">
              {filteredItems.map((item) => (
                <SelectPrimitives.Item
                  key={item.id}
                  className="px-3 py-4 w-full text-left hover:bg-surf-cont-highest transition-all body-l max-w-xs text-ellipsis select-none cursor-pointer focus:bg-surf-cont-high outline-none"
                  value={item.id}
                >
                  <SelectPrimitives.ItemText>{item.label}</SelectPrimitives.ItemText>
                </SelectPrimitives.Item>
              ))}
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

type SelectControlledProps = Omit<SelectProps, 'onChange' | 'value'>;

export const SelectControlled = ({ ...other }: SelectControlledProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={other.name}
      render={({ field }) => {
        console.log(field);
        const handleChange = (value: string) => {
          console.log(value, typeof value);

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
