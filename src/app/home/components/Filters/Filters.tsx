'use client';

import React from 'react';

import { parseAsBoolean, useQueryState } from 'nuqs';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, CheckboxUncontrolled } from '@/components/ui';
import { useAmountTypes, useIngredients, useQueryIngredients, useUser } from '@/hooks';
import { AmountTypeDto, IngredientDto, UserRoles } from '@/types';

import { FormFields } from './Filters.types';
import IngredientsFilter from './local-components/IngredientsFilter';

const defaultValues: FormFields = {
  isDeleted: false,
  excludesIngredients: {},
  includesIngredients: {},
};

const booleanParser = parseAsBoolean.withDefault(false);

type FiltersProps = {
  initialIngredients: IngredientDto[];
  initialAmountTypes: AmountTypeDto[];
};

const Filters = ({ initialIngredients, initialAmountTypes }: FiltersProps) => {
  const [includesIngredients, setIncludesIngredients] = useQueryIngredients('includes');
  const [excludesIngredients, setExcludesIngredients] = useQueryIngredients('excludes');
  const [isDeleted, setIsDeleted] = useQueryState('isDeleted', booleanParser);

  const { data: ingredients } = useIngredients({
    initialData: initialIngredients,
    staleTime: Infinity,
  });
  const { data: amountTypes } = useAmountTypes({
    initialData: initialAmountTypes,
    staleTime: Infinity,
  });
  const values = React.useMemo(
    () => ({
      isDeleted,
      includesIngredients: includesIngredients?.reduce((acc, val) => ({ ...acc, [val]: true }), {}) ?? {},
      excludesIngredients: excludesIngredients?.reduce((acc, val) => ({ ...acc, [val]: true }), {}) ?? {},
    }),
    [includesIngredients, excludesIngredients, isDeleted],
  );
  const { data: user } = useUser();

  const methods = useForm<FormFields>({
    values,
    defaultValues,
  });

  const handleSubmit = ({ includesIngredients, excludesIngredients, isDeleted = false }: FormFields) => {
    setIsDeleted(isDeleted);
    setIncludesIngredients(
      Object.entries(includesIngredients).reduce<number[]>((acc, [key, val]) => {
        if (val) {
          acc.push(Number(key));
        }

        return acc;
      }, []),
    );
    setExcludesIngredients(
      Object.entries(excludesIngredients).reduce<number[]>((acc, [key, val]) => {
        if (val) {
          acc.push(Number(key));
        }

        return acc;
      }, []),
    );
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    handleSubmit(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="w-full sticky top-4 bottom-4 h-[calc(100vh-8rem)] max-h-[80rem] overflow-hidden z-10"
      >
        <h3 className="headline-m">Фильтры</h3>
        <div className="pt-4 h-[calc(100%-5rem)] overflow-y-auto">
          {user?.role === UserRoles.ADMIN && <CheckboxUncontrolled name="isDeleted" label="Удаленные рецепты" className="mb-2" />}
          <IngredientsFilter ingredients={ingredients} />
        </div>
        <div className="flex flex-nowrap items-center gap-3 mt-auto z-30 relative bg-white">
          <Button type="submit">Применить</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Очистить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Filters;
