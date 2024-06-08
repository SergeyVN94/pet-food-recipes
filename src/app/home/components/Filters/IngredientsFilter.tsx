'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useVirtualizer } from '@tanstack/react-virtual';

import { SearchBar } from '@/components';
import { ButtonIcon } from '@/components/ui';
import { IconAdd, IconCheck, IconCheckIndeterminateSmall, IconDelete } from '@/assets/icons';
import { RecipeIngredient } from '@/types';
import FiltersPage from './FiltersPage';
import { FormFields } from './types';

type SelectedIngredientsProps = {
  selectedIngredients: FormFields['ingredients'];
  ingredientsMap: Map<string, RecipeIngredient>;
  onDelete: (id: string) => void;
  onChange: (id: string) => void;
};

const SelectedIngredients = ({ selectedIngredients, ingredientsMap, onDelete, onChange }: SelectedIngredientsProps) =>
  selectedIngredients.size > 0 && (
    <div className="flex flex-col border-b border-t max-h-[13rem] overflow-y-auto">
      {Array.from(selectedIngredients).map(([id, value]) => (
        <div key={id} className="flex items-center flex-1 justify-start">
          <ButtonIcon onClick={() => onChange(id)}>
            {value ? <IconCheck width={24} height={24} /> : <IconCheckIndeterminateSmall width={24} height={24} />}
          </ButtonIcon>
          <p className="body-l mx-2">{ingredientsMap.get(id)?.name}</p>
          <ButtonIcon onClick={() => onDelete(id)} className="ml-auto">
            <IconDelete />
          </ButtonIcon>
        </div>
      ))}
    </div>
  );

type IngredientCardProps = {
  label: string;
  onIncludeBtnClick: () => void;
  onExcludeBtnClick: () => void;
};

const IngredientCard = ({ label, onIncludeBtnClick, onExcludeBtnClick }: IngredientCardProps) => (
  <li className="flex flex-nowrap w-full items-center">
    <ButtonIcon onClick={onIncludeBtnClick}>
      <IconAdd />
    </ButtonIcon>
    <ButtonIcon onClick={onExcludeBtnClick}>
      <IconCheckIndeterminateSmall />
    </ButtonIcon>
    <p tw="body-l ml-2">{label}</p>
  </li>
);

type IngredientsFilterProps = {
  ingredients?: RecipeIngredient[] | null;
  isIngredientsFetching: boolean;
};

const IngredientsFilter = ({ ingredients, isIngredientsFetching }: IngredientsFilterProps) => {
  const methods = useFormContext<FormFields>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState('');

  const ingredientsMap: Map<string, RecipeIngredient> = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map<string, RecipeIngredient>()) ?? new Map(),
    [ingredients],
  );

  const selectedIngredients = useWatch({
    name: 'ingredients',
    control: methods.control,
  });

  const filteredIngredients = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return (ingredients ?? []).filter((i) => !selectedIngredients.has(i.id) && i.name.toLowerCase().includes(normalizedSearch));
  }, [ingredients, search, selectedIngredients]);

  const rowVirtualizer = useVirtualizer({
    count: filteredIngredients.length ?? 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    getItemKey: (index) => filteredIngredients[index].id ?? '',
  });

  const handleIncludeClick = (index: number) => {
    methods.setValue('ingredients', new Map(selectedIngredients.set(filteredIngredients[index].id, true)));
  };

  const handleExcludeClick = (index: number) => {
    methods.setValue('ingredients', new Map(selectedIngredients.set(filteredIngredients[index].id, null)));
  };

  const handleChangeClick = (id: string) => {
    const prevValue = selectedIngredients.get(id);
    methods.setValue('ingredients', new Map(selectedIngredients.set(id, prevValue ? null : true)));
  };

  const handleDeleteClick = (id: string) => {
    selectedIngredients.delete(id);
    methods.setValue('ingredients', new Map(selectedIngredients));
  };

  return (
    <FiltersPage title="Ингредиенты" isLoading={isIngredientsFetching}>
      <SearchBar className="mb-4" onChange={setSearch} delay={200} placeholder="Поиск" isClearable searchParamName="" />
      <SelectedIngredients
        selectedIngredients={selectedIngredients}
        ingredientsMap={ingredientsMap}
        onDelete={handleDeleteClick}
        onChange={handleChangeClick}
      />
      {search.trim() && filteredIngredients.length === 0 && <p className="body-l my-1">По запросу «{search}» ничего не найдено</p>}
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
                label={filteredIngredients[virtualItem.index].name}
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
