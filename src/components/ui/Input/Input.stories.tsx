/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { IconAdd } from '@/assets/icons';
import { Input, InputControlled } from '.';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const FilledUncontrolled: Story = {
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
  render: (props) => {
    const [value, setValue] = useState('');

    return <Input {...props} value={value} onChange={(ev, value) => setValue(value)} onClear={() => setValue('')} />;
  },
};

export const FilledControlled: Story = {
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
  render: (props) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(console.log)}>
          <InputControlled {...props} name="test" />
        </form>
      </FormProvider>
    );
  },
};
