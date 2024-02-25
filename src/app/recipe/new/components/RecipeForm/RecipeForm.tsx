'use client';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button, FileInputControlled, InputControlled, TextareaControlled } from '@/components/ui';
import { useMakeRecipe } from '@/hooks';
import { IconAdd, IconArrowDropDown, IconArrowDropUp, IconDelete } from '@/assets/icons';
import { RecipeDtoStep } from '@/types';
import { ButtonIcon } from '@/components/ui/ButtonIcon';

type FormFieldStep = RecipeDtoStep;

type FormFields = {
  title: string;
  description: string;
  steps: FormFieldStep[];
  images?: FileList;
};

const RecipeForm = ({ className }: { className?: string }) => {
  const navigate = useRouter();

  const { mutateAsync, isLoading } = useMakeRecipe({
    onSuccess: (data) => {
      navigate.push(`/recipe/${data.slug}`);
    },
  });
  const methods = useForm<FormFields>({
    defaultValues: {
      title: '',
      description: '',
      steps: [
        {
          order: 0,
          value: '',
        },
      ],
    },
  });

  const { append, remove, fields, move } = useFieldArray<FormFields>({
    name: 'steps',
    control: methods.control,
  });

  const handleSubmit = (formFields: FormFields) => {
    if (isLoading) {
      return;
    }

    console.log(formFields);
    mutateAsync(formFields);
  };

  const handleAddStepBtnClick = () => {
    append({
      order: fields.length,
      value: '',
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <InputControlled name="title" label="Название" required disabled={isLoading} />
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isLoading} />
        <FileInputControlled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isLoading}
        />
        <fieldset className="mt-8">
          <h4 className="headline-m">Этапы готовки</h4>
          <div className="mt-4">
            {fields.map((field, index) => (
              <div key={field.id} className="mt-3 first:mt-0 flex flex-nowrap items-start">
                <TextareaControlled className="flex-1" name={`steps.${index}.value`} label={`Этап ${index + 1}`} required rows={5} />
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
          <Button
            className="mt-4"
            disabled={isLoading}
            type="button"
            iconLeft={<IconAdd width={24} height={24} />}
            onClick={handleAddStepBtnClick}
          >
            Добавить этап
          </Button>
        </fieldset>
        <Button className="mt-8" disabled={isLoading}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
