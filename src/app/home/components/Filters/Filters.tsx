'use client';

import React from 'react';

import { parseAsBoolean, useQueryState } from 'nuqs';
import { FormProvider, useForm } from 'react-hook-form';

import { useIngredients, useQueryIngredients, useUserRoles } from '@/hooks';
import { AmountTypeDto, IngredientDto } from '@/types';
import { Button, CheckboxUncontrolled } from '@/ui';

import { FormFields } from './Filters.types';
import IngredientsFilter from './local-components/IngredientsFilter';

const defaultValues: FormFields = {
  isDeleted: false,
  isPublished: true,
  excludesIngredients: {},
  includesIngredients: {},
};

const booleanParser = parseAsBoolean.withDefault(false);
const booleanParserDefaultTrue = parseAsBoolean.withDefault(true);

type FiltersProps = {
  initialIngredients: IngredientDto[];
  initialAmountTypes: AmountTypeDto[];
};

const Filters = ({ initialIngredients, initialAmountTypes }: FiltersProps) => {
  const [includesIngredients, setIncludesIngredients] = useQueryIngredients('includes');
  const [excludesIngredients, setExcludesIngredients] = useQueryIngredients('excludes');
  const [isDeleted, setIsDeleted] = useQueryState('isDeleted', booleanParser);
  const [isPublished, setIsPublished] = useQueryState('isPublished', booleanParserDefaultTrue);

  const roles = useUserRoles();
  const { data: ingredients } = useIngredients({
    initialData: initialIngredients,
    staleTime: Infinity,
  });
  const values = React.useMemo(
    () => ({
      isDeleted,
      isPublished,
      includesIngredients: includesIngredients?.reduce((acc, val) => ({ ...acc, [val]: true }), {}) ?? {},
      excludesIngredients: excludesIngredients?.reduce((acc, val) => ({ ...acc, [val]: true }), {}) ?? {},
    }),
    [includesIngredients, excludesIngredients, isDeleted, isPublished],
  );

  const methods = useForm<FormFields>({
    values,
    defaultValues,
  });

  const handleSubmit = ({ includesIngredients, excludesIngredients, isDeleted = false, isPublished = true }: FormFields) => {
    const includes = Object.entries(includesIngredients).reduce<number[]>((acc, [key, val]) => {
      if (val) {
        acc.push(Number(key));
      }

      return acc;
    }, []);
    const excludes = Object.entries(excludesIngredients).reduce<number[]>((acc, [key, val]) => {
      if (val) {
        acc.push(Number(key));
      }

      return acc;
    }, []);

    setIsDeleted(isDeleted);
    setIsPublished(isPublished);
    setIncludesIngredients(includes);
    setExcludesIngredients(excludes);
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    handleSubmit(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="card-outlined w-full relative h-[50rem] max-h-[80rem] overflow-hidden z-10"
      >
        <h3 className="headline-m">Фильтры</h3>
        <div className="pt-4 h-[calc(100%-5rem)] overflow-y-auto">
          {(roles.isAdmin || roles.isModerator) && <CheckboxUncontrolled name="isDeleted" label="Удаленные рецепты" className="mb-2" />}
          {(roles.isAdmin || roles.isModerator) && (
            <CheckboxUncontrolled name="isPublished" label="Опубликованные рецепты" className="mb-2" />
          )}
          <IngredientsFilter ingredients={ingredients} />
        </div>
        <div className="flex flex-nowrap items-center gap-3 mt-auto z-30 relative bg-transparent">
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
