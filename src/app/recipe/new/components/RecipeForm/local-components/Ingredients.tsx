/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import { FieldArrayWithId, UseFormReturn, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { IconAdd, IconDelete } from '@/assets/icons';
import { Button, InputUncontrolled, SelectItem, SelectUncontrolled } from '@/components/ui';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { AmountType, RecipeIngredient } from '@/types';

import { FormFields } from '../RecipeForm.types';

type IngredientsRowProps = {
  field: FieldArrayWithId<FormFields, 'ingredients', 'id'>;
  index: number;
  totalFields: number;
  amountTypeItems: SelectItem[];
  recipeIngredientMap: Map<RecipeIngredient['id'], RecipeIngredient>;
  recipeIngredientItems: SelectItem[];
  onRemoveIngredient: (index: number) => void;
};

const IngredientsRow = ({
  field,
  index,
  totalFields,
  amountTypeItems,
  recipeIngredientMap,
  recipeIngredientItems,
  onRemoveIngredient,
}: IngredientsRowProps) => {
  const context = useFormContext();

  const ingredientId: RecipeIngredient['id'] | undefined = useWatch({
    name: `ingredients.${index}.ingredientId`,
    control: context.control,
  });

  const filteredAmountTypes = React.useMemo(() => {
    if (!ingredientId) {
      return amountTypeItems;
    }

    const ingredient = recipeIngredientMap.get(ingredientId)!;

    return amountTypeItems.filter(i => ingredient.amountTypes.some(j => j.id === i.id));
  }, [amountTypeItems, ingredientId, recipeIngredientMap]);

  return (
    <tr key={field.id}>
      <td className="pr-3 pb-3 w-1/3">
        <SelectUncontrolled name={`ingredients.${index}.ingredientId`} label="Ингредиент" items={recipeIngredientItems} />
      </td>
      <td className="px-3 pb-3 w-1/3">
        <InputUncontrolled name={`ingredients.${index}.count`} type="number" label="Количество" min={0} required />
      </td>
      <td className="pl-3 pb-3 flex flex-nowrap items-center w-1/3 min-w-[18rem]">
        <div className="flex items-center w-full">
          <SelectUncontrolled
            name={`ingredients.${index}.amountTypeId`}
            className="flex-1"
            label="Единицы измерения"
            items={filteredAmountTypes}
          />
          <ButtonIcon onClick={() => onRemoveIngredient(index)} type="button" disabled={totalFields === 1}>
            <IconDelete className="group-hover/button-icon:text-error" />
          </ButtonIcon>
        </div>
      </td>
    </tr>
  );
};

type IngredientsProps = {
  methods: UseFormReturn<FormFields, any, undefined>;
  isLoading: boolean;
  amountTypes: AmountType[];
  recipeIngredients: RecipeIngredient[];
};

const Ingredients = ({ methods, isLoading, amountTypes, recipeIngredients }: IngredientsProps) => {
  const amountTypeItems: SelectItem[] = React.useMemo(
    () =>
      amountTypes.map(i => ({
        id: i.id,
        label: i.name,
      })),
    [amountTypes],
  );

  const recipeIngredientItems: SelectItem[] = React.useMemo(
    () =>
      recipeIngredients.map(i => ({
        id: i.id,
        label: i.name,
      })),
    [recipeIngredients],
  );

  const recipeIngredientMap: Map<RecipeIngredient['id'], RecipeIngredient> = React.useMemo(
    () => recipeIngredients.reduce((acc, val) => acc.set(val.id, val), new Map()),
    [recipeIngredients],
  );

  const { append, remove, fields, move } = useFieldArray<FormFields, 'ingredients'>({
    name: 'ingredients',
    control: methods.control,
  });

  const handleAddIngredientBtnClick = () => {
    append({
      count: 0,
    });
  };

  const handleRemoveIngredientBtnClick = (index: number) => {
    remove(index);
  };

  const recipeIngredientItemsFiltered: SelectItem[] = React.useMemo(() => {
    const selectedIngredientsSet = fields.reduce((acc, value) => acc.add(value.id), new Set());

    return recipeIngredientItems.filter(i => !selectedIngredientsSet.has(i.id));
  }, [recipeIngredientItems, fields]);

  return (
    <fieldset className="mt-8 p-0">
      <h4 className="headline-m">Ингредиенты</h4>
      <div className="mt-4">
        <table className="border-separate border-spacing-0 w-full">
          <tbody>
            {fields.map((field, index) => (
              <IngredientsRow
                key={field.id}
                field={field}
                index={index}
                totalFields={fields.length}
                amountTypeItems={amountTypeItems}
                onRemoveIngredient={handleRemoveIngredientBtnClick}
                recipeIngredientItems={recipeIngredientItemsFiltered}
                recipeIngredientMap={recipeIngredientMap}
              />
            ))}
          </tbody>
        </table>
        <Button
          className="mt-1"
          disabled={isLoading}
          type="button"
          iconLeft={<IconAdd width={24} height={24} />}
          onClick={handleAddIngredientBtnClick}
        >
          Добавить ингредиент
        </Button>
      </div>
    </fieldset>
  );
};

export default Ingredients;
