/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Select, SelectItem, SelectUncontrolled } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Select> = {
  component: Select,
};

const items: SelectItem[] = Array(50000)
  .fill(null)
  .map<SelectItem>((_, i) => ({
    id: String(i),
    label: `item: ${i}`,
  }));

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
