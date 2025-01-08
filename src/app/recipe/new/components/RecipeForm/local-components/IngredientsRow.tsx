import React from 'react';

import { FieldArrayWithId, useFormContext, useWatch } from 'react-hook-form';

import { IconDelete } from '@/assets/icons';
import { InputUncontrolled, SelectItem, SelectUncontrolled } from '@/components/ui';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { IngredientDto } from '@/types';

import { FormFields } from '../RecipeForm.types';

type IngredientsRowProps = {
  field: FieldArrayWithId<FormFields, 'ingredients', 'id'>;
  index: number;
  isCanDelete: boolean;
  amountTypeItems: SelectItem[];
  recipeIngredientMap: Map<IngredientDto['id'], IngredientDto>;
  recipeIngredientItems: SelectItem[];
  onRemoveIngredient: (index: number) => void;
};

const IngredientsRow = ({
  field,
  index,
  isCanDelete,
  amountTypeItems,
  recipeIngredientMap,
  recipeIngredientItems,
  onRemoveIngredient,
}: IngredientsRowProps) => {
  const context = useFormContext();

  const ingredientId: string = useWatch({
    name: `ingredients.${index}.ingredientId`,
    control: context.control,
  });

  const filteredAmountTypes = React.useMemo(() => {
    if (!ingredientId) {
      return amountTypeItems;
    }

    const ingredient = recipeIngredientMap.get(Number(ingredientId))!;

    return amountTypeItems.filter(amountType => ingredient.amountTypes.includes(Number(amountType.id)));
  }, [amountTypeItems, ingredientId, recipeIngredientMap]);

  return (
    <tr key={field.id} className="">
      <td className="pr-3 pb-3 w-1/3">
        <SelectUncontrolled name={`ingredients.${index}.ingredientId`} label="Ингредиент" items={recipeIngredientItems} />
      </td>
      <td className="px-3 pb-3 w-1/3">
        <InputUncontrolled name={`ingredients.${index}.count`} type="number" label="Количество" min={0} required />
      </td>
      <td className="pl-3 pb-3 w-1/3 min-w-[18rem]">
        <div className="flex items-center w-full">
          <SelectUncontrolled
            name={`ingredients.${index}.amountTypeId`}
            className="flex-1"
            label="Единицы измерения"
            items={filteredAmountTypes}
          />
          <ButtonIcon onClick={() => onRemoveIngredient(index)} type="button" disabled={isCanDelete}>
            <IconDelete className="group-hover/button-icon:text-error" />
          </ButtonIcon>
        </div>
      </td>
    </tr>
  );
};

export default IngredientsRow;
