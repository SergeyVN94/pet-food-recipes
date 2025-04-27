import React from 'react';

import { UseFormReturn, useFieldArray } from 'react-hook-form';

import { IconAdd } from '@/assets/icons';
import { AmountTypeDto, IngredientDto } from '@/types';
import { Button, SelectItem } from '@/ui';

import { FormFields } from '../RecipeForm.types';
import IngredientsRow from './IngredientsRow';

type IngredientsProps = {
  methods: UseFormReturn<FormFields, any, undefined>;
  amountTypes: AmountTypeDto[];
  recipeIngredients: IngredientDto[];
};

const Ingredients = ({ methods, amountTypes, recipeIngredients }: IngredientsProps) => {
  const amountTypeItems: SelectItem[] = React.useMemo(
    () =>
      amountTypes.map(amountType => ({
        id: String(amountType.id),
        label: amountType.name,
      })),
    [amountTypes],
  );

  const recipeIngredientItems: SelectItem[] = React.useMemo(
    () =>
      recipeIngredients.map(recipeIngredient => ({
        id: String(recipeIngredient.id),
        label: recipeIngredient.name,
      })),
    [recipeIngredients],
  );

  const recipeIngredientMap: Map<IngredientDto['id'], IngredientDto> = React.useMemo(
    () => recipeIngredients.reduce((acc, val) => acc.set(val.id, val), new Map()),
    [recipeIngredients],
  );

  const { append, remove, fields } = useFieldArray<FormFields, 'ingredients'>({
    name: 'ingredients',
    control: methods.control,
  });

  const recipeIngredientItemsFiltered: SelectItem[] = React.useMemo(() => {
    const selectedIngredientsSet = fields.reduce((acc, value) => acc.add(value.ingredientId), new Set());

    return recipeIngredientItems.filter(recipeIngredient => !selectedIngredientsSet.has(recipeIngredient.id));
  }, [recipeIngredientItems, fields]);

  const handleAddIngredientBtnClick = () => {
    append({
      count: 0,
    });
  };

  const handleRemoveIngredientBtnClick = (index: number) => {
    remove(index);
  };

  return (
    <fieldset className="mt-8 p-0">
      <h4 className="headline-m">
        Ингредиенты <span className="text-primary">{`${fields.length}/50`}</span>
      </h4>
      <div className="mt-4">
        <table className="border-separate border-spacing-0 w-full">
          <tbody>
            {fields.map((field, index) => (
              <IngredientsRow
                key={field.id}
                field={field}
                index={index}
                isCanDelete={fields.length < 2}
                amountTypeItems={amountTypeItems}
                onRemoveIngredient={handleRemoveIngredientBtnClick}
                recipeIngredientItems={
                  field.ingredientId
                    ? [
                        { id: String(field.ingredientId), label: recipeIngredientMap.get(Number(field.ingredientId))!.name },
                        ...recipeIngredientItemsFiltered,
                      ]
                    : recipeIngredientItemsFiltered
                }
                recipeIngredientMap={recipeIngredientMap}
              />
            ))}
          </tbody>
        </table>
        <Button className="mt-1" type="button" iconLeft={<IconAdd width={24} height={24} />} onClick={handleAddIngredientBtnClick}>
          Добавить ингредиент
        </Button>
      </div>
    </fieldset>
  );
};

export default Ingredients;
