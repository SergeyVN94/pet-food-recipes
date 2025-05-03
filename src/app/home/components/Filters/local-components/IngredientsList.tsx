'use client';

import React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { IconAdd } from '@/assets/icons';
import { SearchBar } from '@/components';
import { IngredientDto } from '@/types';
import { ButtonIcon } from '@/ui';

import { FormFields } from '../Filters.types';
import SelectedIngredients from './SelectedIngredients';

type IngredientsListProp = {
  ingredientsMap: Map<IngredientDto['id'], IngredientDto>;
  selectedIngredients: FormFields['includesIngredients'];
  allSelectedIngredients: FormFields['includesIngredients'];
  onAddIngredient: (id: IngredientDto['id']) => void;
  onDeleteIngredient: (id: IngredientDto['id']) => void;
  ingredients?: IngredientDto[] | null;
};

const IngredientsList = ({
  ingredients,
  ingredientsMap,
  selectedIngredients,
  onAddIngredient,
  onDeleteIngredient,
  allSelectedIngredients,
}: IngredientsListProp) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState('');

  const filteredIngredients = React.useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return (ingredients ?? []).filter(
      ingredient => !allSelectedIngredients[ingredient.id] && ingredient.name.toLowerCase().includes(normalizedSearch),
    );
  }, [ingredients, search, allSelectedIngredients]);

  const rowVirtualizer = useVirtualizer({
    count: filteredIngredients.length ?? 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    getItemKey: index => filteredIngredients[index].id ?? '',
  });

  return (
    <>
      <SearchBar className="mb-4" onChange={setSearch} delay={250} placeholder="Поиск" />
      {search.trim() && filteredIngredients.length === 0 && <p className="body-l my-1">По запросу «{search}» ничего не найдено</p>}
      <SelectedIngredients selectedIngredients={selectedIngredients} ingredientsMap={ingredientsMap} onDelete={onDeleteIngredient} />
      <div className="overflow-y-auto flex-1 max-h-[15rem]" ref={containerRef}>
        <ul className="w-full relative" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map(virtualItem => (
            <li
              key={virtualItem.key}
              className="absolute top-0 left-0 flex flex-nowrap w-full items-center"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ButtonIcon onClick={() => onAddIngredient(filteredIngredients[virtualItem.index].id)} type="button" icon={IconAdd} />
              <p tw="body-l ml-2">{filteredIngredients[virtualItem.index].name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IngredientsList;
