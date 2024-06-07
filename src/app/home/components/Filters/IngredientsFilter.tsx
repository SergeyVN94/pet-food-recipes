'use client';

import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useVirtualizer } from '@tanstack/react-virtual';

import { SearchBar } from '@/components';
import { ButtonIcon } from '@/components/ui';
import { IconAdd, IconCheckIndeterminateSmall } from '@/assets/icons';
import FiltersPage from './FiltersPage';
import { FormFields } from './types';
import { useRecipeIngredients } from '@/hooks';

type IngredientCardProps = {
  id: string;
  label: string;
  onIncludeBtnClick: () => void;
  onExcludeBtnClick: () => void;
};

const IngredientCard = ({ id, label, onIncludeBtnClick, onExcludeBtnClick }: IngredientCardProps) => (
  <li className="flex flex-nowrap w-full items-center">
    <ButtonIcon onClick={onIncludeBtnClick} type="button">
      <IconAdd />
    </ButtonIcon>
    <ButtonIcon onClick={onExcludeBtnClick} type="button">
      <IconCheckIndeterminateSmall />
    </ButtonIcon>
    <p tw="body-l ml-2">{label}</p>
  </li>
);;

const IngredientsFilter = () => {
  const methods = useFormContext<FormFields>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState('');
  const { data: ingredients = [], isFetching: isIngredientsFetching } = useRecipeIngredients();

  const { fields } = useFieldArray({
    name: 'ingredients',
    control: methods.control,
  });

  const filteredFields = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return fields.filter((i) => i.name.toLowerCase().includes(normalizedSearch));
  }, [ingredients, search]);

  const rowVirtualizer = useVirtualizer({
    count: ingredients?.length ?? 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    getItemKey: (index) => ingredients?.[index].id ?? '',
  });

  const handleIncludeClick = (index: number) => {
    
  };

  const handleExcludeClick = (index: number) => {

  };

  return (
    <FiltersPage title="Ингредиенты">
      <div>

      </div>
      <SearchBar className="mb-4" onChange={setSearch} delay={200} placeholder="Поиск" isClearable searchParamName="" />
      <div className="overflow-y-auto flex-1" ref={containerRef}>
        <div className="w-full relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <ul
              key={virtualItem.key}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <IngredientCard
                id={filteredFields[virtualItem.index].id}
                label={filteredFields[virtualItem.index].name}
                onIncludeBtnClick={() => handleIncludeClick(virtualItem.index)}
                onExcludeBtnClick={() => handleExcludeClick(virtualItem.index)}
                key={virtualItem.key}
              />
            </ul>
          ))}
        </div>
      </div>
    </FiltersPage>
  );
};

export default IngredientsFilter;
