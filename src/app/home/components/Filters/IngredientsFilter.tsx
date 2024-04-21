'use client';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useVirtualizer } from '@tanstack/react-virtual';

import { CheckboxControlled } from '@/components/ui';
import { SearchBar } from '@/components';
import FiltersPage from './FiltersPage';
import { FormFields } from './types';

const IngredientsFilter = () => {
  const methods = useFormContext<FormFields>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState('');

  const { fields } = useFieldArray({
    name: 'ingredients',
    control: methods.control,
  });

  const filteredFields = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return fields.filter((i) => i.name.toLowerCase().includes(normalizedSearch));
  }, [fields, search]);

  const rowVirtualizer = useVirtualizer({
    count: filteredFields.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 40,
    getItemKey: (index) => filteredFields[index].id,
  });

  return (
    <FiltersPage title="Ингредиенты">
      <SearchBar className="mb-4" onChange={setSearch} delay={200} placeholder="Поиск" isClearable searchParamName="" />
      <div className="overflow-y-auto flex-1" ref={containerRef}>
        <div className="w-full relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <CheckboxControlled
                name={`ingredients.${filteredFields[virtualItem.index].index}.value`}
                label={filteredFields[virtualItem.index].name}
                key={virtualItem.key}
                isIndeterminate
              />
            </div>
          ))}
        </div>
      </div>
    </FiltersPage>
  );
};

export default IngredientsFilter;
