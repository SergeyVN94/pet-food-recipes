'use client';

import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui';
import { useRecipeIngredients } from '@/hooks';

import { searchParamsToFormFields } from './Filters.lib';
import { FormFields } from './Filters.types';
import IngredientsFilter from './local-components/IngredientsFilter';

const defaultValues: FormFields = {
  excludesIngredients: {},
  includesIngredients: {},
};

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data: ingredients } = useRecipeIngredients();
  const values = React.useMemo(
    () => searchParamsToFormFields({ params: searchParams, ingredients: ingredients ?? [] }),
    [searchParams, ingredients],
  );

  const methods = useForm<FormFields>({
    values,
    defaultValues,
  });

  const handleSubmit = ({ includesIngredients, excludesIngredients }: FormFields) => {
    const nextParams = new URLSearchParams();

    if (searchParams.get('q')?.trim()) {
      nextParams.set('q', searchParams.get('q') ?? '');
    }

    Object.keys(includesIngredients).forEach(id => {
      if (includesIngredients[Number(id)]) {
        nextParams.append('ingr-inc[]', id);
      }
    });

    Object.keys(excludesIngredients).forEach(id => {
      if (excludesIngredients[Number(id)]) {
        nextParams.append('ingr-exc[]', id);
      }
    });

    replace(`${pathname}?${nextParams.toString()}`);
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
