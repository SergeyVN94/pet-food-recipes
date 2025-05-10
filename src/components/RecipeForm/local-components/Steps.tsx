import React from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { IconAdd, IconArrowDropDown, IconArrowDropUp, IconDelete } from '@/assets/icons';
import { Button, TextareaUncontrolled } from '@/ui';
import { ButtonIcon } from '@/ui/ButtonIcon';

import { FormFields } from '../RecipeForm.types';

const Steps = () => {
  const methods = useFormContext<FormFields>();

  const { append, remove, fields, move } = useFieldArray<FormFields>({
    name: 'steps',
    control: methods.control,
  });

  const handleAddStepBtnClick = () => {
    append({
      content: '',
    });
  };

  const handleRemoveStepBtnClick = (index: number) => {
    remove(index);
  };

  const handleMoveTopBtnClick = (index: number) => {
    move(index, index - 1);
  };

  const handleMoveBottomBtnClick = (index: number) => {
    move(index, index + 1);
  };

  return (
    <fieldset className="mt-8 p-0">
      <legend className="headline-m">
        Этапы готовки <span className="text-primary">{`${fields.length}/50`}</span>
      </legend>
      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={field.id} className="mt-3 flex flex-nowrap items-start first:mt-0">
            <TextareaUncontrolled
              className="flex-1"
              name={`steps.${index}.content`}
              label={`Этап ${index + 1}`}
              required
              rows={5}
              maxLength={3000}
            />
            <div className="flex flex-col">
              <ButtonIcon onClick={() => handleRemoveStepBtnClick(index)} disabled={fields.length === 1} icon={IconDelete} />
              <ButtonIcon
                onClick={() => handleMoveTopBtnClick(index)}
                disabled={fields.length === 1 || index === 0}
                icon={IconArrowDropUp}
              />
              <ButtonIcon
                onClick={() => handleMoveBottomBtnClick(index)}
                disabled={fields.length === 1 || index === fields.length - 1}
                icon={IconArrowDropDown}
              />
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-4" type="button" iconLeft={IconAdd} onClick={handleAddStepBtnClick}>
        Добавить этап
      </Button>
    </fieldset>
  );
};

export default Steps;
