'use client';

import React from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { RecipeIngredient } from '@/types';

import { FormFields } from '../Filters.types';
import FiltersPage from '../FiltersPage';
import Accordion from './Accordion';
import IngredientsList from './IngredientsList';

type IngredientsFilterProps = {
  ingredients?: RecipeIngredient[] | null;
  isIngredientsFetching: boolean;
};

const IngredientsFilter = ({ ingredients, isIngredientsFetching }: IngredientsFilterProps) => {
  const methods = useFormContext<FormFields>();

  const ingredientsMap: Map<string, RecipeIngredient> = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map<string, RecipeIngredient>()) ?? new Map(),
    [ingredients],
  );

  const selectedIncludesIngredients = useWatch({
    name: 'includesIngredients',
    control: methods.control,
  });

  const selectedExcludesIngredients = useWatch({
    name: 'excludesIngredients',
    control: methods.control,
  });

  const allSelectedIngredients = React.useMemo(
    () => ({ ...selectedIncludesIngredients, ...selectedExcludesIngredients }),
    [selectedIncludesIngredients, selectedExcludesIngredients],
  );

  const handleIncludeClick = (id: string) => {
    methods.setValue('includesIngredients', {
      ...selectedIncludesIngredients,
      [id]: true,
    });
  };

  const handleExcludeClick = (id: string) => {
    methods.setValue('excludesIngredients', {
      ...selectedExcludesIngredients,
      [id]: true,
    });
  };

  const handleDeleteClick = (id: string) => {
    if (selectedIncludesIngredients[id]) {
      const nextSelected = { ...selectedIncludesIngredients };
      delete nextSelected[id];

      methods.setValue('includesIngredients', nextSelected);
    }

    if (selectedExcludesIngredients[id]) {
      const nextSelected = { ...selectedExcludesIngredients };
      delete nextSelected[id];

      methods.setValue('excludesIngredients', nextSelected);
    }
  };

  return (
    <FiltersPage title="Ингредиенты" isLoading={isIngredientsFetching}>
      <Accordion label="Добавить ингредиенты">
        <IngredientsList
          ingredients={ingredients}
          ingredientsMap={ingredientsMap}
          selectedIngredients={selectedIncludesIngredients}
          allSelectedIngredients={allSelectedIngredients}
          onAddIngredient={handleIncludeClick}
          onDeleteIngredient={handleDeleteClick}
        />
      </Accordion>
      <Accordion label="Исключить ингредиенты">
        <IngredientsList
          ingredients={ingredients}
          ingredientsMap={ingredientsMap}
          allSelectedIngredients={allSelectedIngredients}
          selectedIngredients={selectedExcludesIngredients}
          onAddIngredient={handleExcludeClick}
          onDeleteIngredient={handleDeleteClick}
        />
      </Accordion>
    </FiltersPage>
  );
};

export default IngredientsFilter;
