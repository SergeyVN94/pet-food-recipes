'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button, FileInputControlled, InputControlled, TextareaControlled } from '@/components/ui';
import { useMakeRecipe } from '@/hooks';

type FormFields = {
  title: string;
  description: string;
  images?: FileList;
};

const RecipeForm = ({ className }: { className?: string }) => {
  const navigate = useRouter();

  const { mutateAsync, isLoading } = useMakeRecipe({
    onSuccess: (data) => {
      navigate.push(`/recipe/${data.slug}`);
    },
  });
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
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isLoading} />
        <FileInputControlled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isLoading}
        />
        <Button className="mt-4" disabled={isLoading}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
