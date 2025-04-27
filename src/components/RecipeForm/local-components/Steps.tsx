import { UseFormReturn, useFieldArray } from 'react-hook-form';

import { IconAdd, IconArrowDropDown, IconArrowDropUp, IconDelete } from '@/assets/icons';
import { Button, TextareaUncontrolled } from '@/ui';
import { ButtonIcon } from '@/ui/ButtonIcon';

import { FormFields } from '../RecipeForm.types';

type StepsProps = {
  methods: UseFormReturn<FormFields, any, undefined>;
};

const Steps = ({ methods }: StepsProps) => {
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
      <h4 className="headline-m">
        Этапы готовки <span className="text-primary">{`${fields.length}/50`}</span>
      </h4>
      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={field.id} className="mt-3 first:mt-0 flex flex-nowrap items-start">
            <TextareaUncontrolled
              className="flex-1"
              name={`steps.${index}.content`}
              label={`Этап ${index + 1}`}
              required
              rows={5}
              maxLength={3000}
            />
            <div className="flex flex-col">
              <ButtonIcon onClick={() => handleRemoveStepBtnClick(index)} disabled={fields.length === 1}>
                <IconDelete className="group-hover/button-icon:text-error" />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleMoveTopBtnClick(index)} disabled={fields.length === 1 || index === 0}>
                <IconArrowDropUp />
              </ButtonIcon>
              <ButtonIcon onClick={() => handleMoveBottomBtnClick(index)} disabled={fields.length === 1 || index === fields.length - 1}>
                <IconArrowDropDown />
              </ButtonIcon>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-4" type="button" iconLeft={<IconAdd width={24} height={24} />} onClick={handleAddStepBtnClick}>
        Добавить этап
      </Button>
    </fieldset>
  );
};

export default Steps;
