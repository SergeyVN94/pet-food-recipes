/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { IconMenu, IconSearch } from '@/assets/icons';

import { Input, InputUncontrolled } from '.';
import type { InputAutocompleteItem } from '.';
import { Chip } from '../Chip';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

const autocompleteItems: InputAutocompleteItem[] = [
  {
    id: '1',
    label: 'Является одним из самых распространённых',
  },
  {
    id: '2',
    label: 'Java — строго типизированный объектно-ориентированный',
  },
  {
    id: '3',
    label: 'Популярность Erlang начала расти в связи с расширением его',
  },
  {
    id: '4',
    label: 'В наш век информации слишком много',
  },
  {
    id: '5',
    label: 'Python поддерживает несколько парадигм программирования, в том',
  },
  {
    id: '6',
    label: 'Сопоставление с образцом распространено даже',
  },
  {
    id: '7',
    label: 'Полнотиповое программирование — стиль программирования, отличающийся обширным использованием',
  },
  {
    id: '8',
    label: 'Erlang применяется в',
  },
  {
    id: '9',
    label: 'Python — высокоуровневый язык программирования',
  },
  {
    id: '10',
    label: 'Отличительная',
  },
  {
    id: '11',
    label: 'Erlang является декларативным',
  },
  {
    id: '12',
    label: 'В наш век информации слишком',
  },
  {
    id: '13',
    label: 'Полнотиповое программирование может поддерживаться .',
  },
  {
    id: '14',
    label: 'Например, определение функции, которое использует',
  },
  {
    id: '15',
    label: 'Java — строго типизированный объектно-ориентированный',
  },
  {
    id: '16',
    label: 'Популярность Erlang начала расти в связи',
  },
  {
    id: '17',
    label: 'Haskell — стандартизированный чистый функциональный',
  },
  {
    id: '18',
    label: 'Erlang был целенаправленно разработан для применения',
  },
  {
    id: '19',
    label: 'Парадигма программирования — это совокупность идей и понятий, определяющих стиль написания компьютерных программ.',
  },
  {
    id: '20',
    label: 'Отличительная черта языка — серьёзное отношение к типизации.',
  },
  {
    id: '21',
    label: 'Erlang был целенаправленно разработан для применения в распределённых',
  },
  {
    id: '22',
    label: 'Полнотиповое программирование может поддерживаться',
  },
  {
    id: '23',
    label: 'Python поддерживает несколько парадигм программирования',
  },
  {
    id: '24',
    label: 'Парадигма программирования — это совокупность',
  },
  {
    id: '25',
    label: 'Отличительная черта языка',
  },
];

const autocompleteItemsMap = autocompleteItems.reduce<Record<string, InputAutocompleteItem>>((acc, value) => {
  acc[value.id] = value;

  return acc;
}, {});

export const Controlled: Story = {
  args: {
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline'],
    },
    label: { type: 'string' },
    subText: { type: 'string' },
    placeholder: { type: 'string' },
    iconLeft: {
      control: { type: 'select' },
      options: ['search', 'menu'],
      mapping: {
        search: <IconSearch />,
        menu: <IconMenu />,
      },
    },
  },
  render: props => {
    const [value, setValue] = React.useState('');

    return <Input {...props} value={value} onChange={(ev, value) => setValue(value)} onClear={() => setValue('')} />;
  },
};

export const ControlledWithAutocomplete: Story = {
  args: {
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline'],
    },
    label: { type: 'string' },
    subText: { type: 'string' },
    placeholder: { type: 'string' },
    iconLeft: {
      control: { type: 'select' },
      options: ['search', 'menu'],
      mapping: {
        search: <IconSearch />,
        menu: <IconMenu />,
      },
    },
  },
  render: props => {
    const [value, setValue] = React.useState('');
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

    const autocompleteItemsSearch = React.useMemo(() => {
      const normalized = value.trim().toLowerCase();

      return autocompleteItems.filter(item => (normalized ? item.label.includes(normalized) : true && !selectedIds.has(item.id)));
    }, [value, selectedIds]);

    const onSelect = (id: string) => {
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.add(id);

        return next;
      });
    };

    const onDelete = (id: string) => {
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);

        return next;
      });
    };

    return (
      <div>
        <div style={{ padding: '0 0 1.5rem 0', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {Array.from(selectedIds).map(id => (
            <Chip label={autocompleteItemsMap[id].label} key={id} onClose={() => onDelete(id)} />
          ))}
        </div>
        <Input
          {...props}
          value={value}
          onChange={(ev, value) => setValue(value)}
          onClear={() => setValue('')}
          autocompleteItems={autocompleteItemsSearch}
          onAutoCompleteSelect={onSelect}
        />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline'],
    },
    label: { type: 'string' },
    subText: { type: 'string' },
  },
  render: props => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(console.log)}>
          <InputUncontrolled {...props} name="test" />
        </form>
      </FormProvider>
    );
  },
};
