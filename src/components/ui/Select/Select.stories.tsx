/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Select, SelectItem, SelectUncontrolled } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Select> = {
  component: Select,
};

const items: SelectItem[] = [
  { id: '0', label: '0000' },
  { id: '1', label: '1111' },
  { id: '2', label: '2222' },
  { id: '3', label: '3333' },
  { id: '4', label: '4444' },
  { id: '5', label: '5555' },
  { id: '6', label: '6666' },
];

export default meta;
type Story = StoryObj<typeof Select>;

export const FilledUncontrolled: Story = {
  args: {},
  argTypes: {},
  render: props => {
    const [value, setValue] = useState<string>();

    const handleChange = (val: string) => {
      console.log('change', val);
      setValue(val);
    };

    return <Select {...props} name="default" items={items} value={value} onChange={handleChange} />;
  },
};

export const FilledControlled: Story = {
  args: {},
  argTypes: {},
  render: props => {
    const methods = useForm<{
      controlled?: string | undefined;
    }>();

    const handleSubmit = (fields: { controlled?: string }) => {
      console.log('submit', fields);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex gap-4">
          <SelectUncontrolled {...props} name="controlled" items={items} />
          {/* <Button type="submit">submit</Button> */}
        </form>
      </FormProvider>
    );
  },
};
