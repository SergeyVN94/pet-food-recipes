'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button, FileInputControlled, InputControlled, TextareaControlled } from '@/components/ui';
import { useMakeRecipe } from '@/hooks';

type FormFields = {
  title: string;
  description: string;
  images?: FileList;
};

const RecipeForm = ({ className }: { className?: string }) => {
  const { mutateAsync, isLoading } = useMakeRecipe();
  const methods = useForm<FormFields>();

  const handleSubmit = (formFields: FormFields) => {
    if (isLoading) {
      return;
    }

    mutateAsync(formFields);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <InputControlled name="title" label="Название" required disabled={isLoading} />
        <TextareaControlled name="description" label="Описание" className="mt-4" maxRows={8} required disabled={isLoading} />
        <FileInputControlled name="images" multiple accept="image/png image/jpg image/jpeg" className="mt-4" disabled={isLoading} />
        <Button className="mt-4" disabled={isLoading}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
