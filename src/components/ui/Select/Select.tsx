'use client';

import React from 'react';

import * as SelectPrimitives from '@radix-ui/react-select';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Controller, useFormContext } from 'react-hook-form';

import { IconArrowLeft, IconClose } from '@/assets/icons';
import { cn } from '@/utils/utils';

import { Button } from '../Button';
import { ButtonIcon } from '../ButtonIcon';

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
  value?: SelectItem['id'] | null;
  error?: string;
  onChange: (id: SelectItem['id']) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
};

const Select = ({ ariaLabel, items, value, error, label, name, className, onChange, onBlur, onFocus, onClear }: SelectProps) => {
  const selectedItemLabel = React.useMemo(() => items.find(item => item.id === value)?.label, [items, value]);
  const [isOpen, setIsOpen] = React.useState(false);
  const itemsParentRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => itemsParentRef.current,
    estimateSize: () => 56,
    getItemKey: index => items[index].id,
  });

  const handleClearClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    ev.preventDefault();

    if (onClear) {
      onClear();
    }
  };

  return (
    <SelectPrimitives.Root onValueChange={onChange} onOpenChange={setIsOpen} open={isOpen} name={name} value={value ?? undefined}>
      <SelectPrimitives.Trigger
        className={cn(
          'outline-none w-full cursor-pointer py-1 pl-4 relative bg-surf-cont-highest rounded-t min-h-[3.5rem] after:absolute after:block after:w-full after:bottom-0 after:left-0 after:h-[1px] after:bg-on-surface  hover:bg-on-surface/10 focus:after:h-0.5 focus:after:bg-primary min-w-[10rem]',
          className,
        )}
        aria-label={ariaLabel}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={triggerRef}
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
          <span className="body-l data-[label='true']:pt-3 whitespace-nowrap overflow-ellipsis block" data-label={Boolean(label)}>
            {selectedItemLabel}
          </span>
          <span className="ml-auto flex flex-nowrap items-center">
            <IconArrowLeft
              className="ml-auto mr-3 -rotate-90 data-[open='true']:rotate-90 transition-all"
              data-open={isOpen}
              width={24}
              height={24}
            />
          </span>
        </span>
      </SelectPrimitives.Trigger>
      <SelectPrimitives.Portal>
        <SelectPrimitives.Content sideOffset={4} alignOffset={0} position="popper">
          <SelectPrimitives.Viewport className="rounded-md bg-surf-cont flex flex-col w-full shadow-elevation-2">
            {onClear && (
              <div className="p-2">
                <Button onClick={handleClearClick} className="w-full">
                  Очистить
                </Button>
              </div>
            )}
            {/* 21rem == 6 items */}
            <div
              className="max-h-[21rem] w-64 overflow-y-auto"
              ref={itemsParentRef}
              style={{ minWidth: `${triggerRef.current?.offsetWidth ?? 0}px` }}
            >
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
                      key={items[virtualItem.index].id}
                      className="px-3 py-4 w-full text-left hover:bg-surf-cont-highest transition-all body-l max-w-xs text-ellipsis select-none cursor-pointer focus:bg-surf-cont-high outline-none"
                      value={items[virtualItem.index].id}
                    >
                      <SelectPrimitives.ItemText>{items[virtualItem.index].label}</SelectPrimitives.ItemText>
                    </SelectPrimitives.Item>
                  </div>
                ))}
              </div>
            </div>
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
