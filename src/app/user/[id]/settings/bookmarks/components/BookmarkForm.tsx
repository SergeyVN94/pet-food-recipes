'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { IconAdd, IconSave } from '@/assets/icons';
import { ButtonIcon, InputUncontrolled } from '@/components/ui';

type BookmarkFormProps = {
  value?: string;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
  isNew?: boolean;
};

const BookmarkForm = ({ value, onSubmit, isLoading, isNew }: BookmarkFormProps) => {
  const methods = useForm<{ bookmark: string }>({
    values: {
      bookmark: value ?? '',
    },
  });

  const handleSubmit = (data: { bookmark: string }) => {
    onSubmit(data.bookmark);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-nowrap items-center gap-2 w-full">
        <InputUncontrolled name="bookmark" className="w-full" label={isNew ? 'Новая закладка' : 'Название закладки'} maxLength={50} />
        <ButtonIcon type="submit" disabled={isLoading}>
          {isNew ? <IconAdd className="size-6" /> : <IconSave className="size-6" />}
        </ButtonIcon>
      </form>
    </FormProvider>
  );
};

export default BookmarkForm;
