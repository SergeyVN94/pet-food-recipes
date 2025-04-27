/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Textarea, TextareaUncontrolled } from '.';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

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
    maxRows: { type: 'number', min: 1 },
  },
  render: props => {
    const [value, setValue] = useState('');

    return <Textarea {...props} value={value} onChange={(ev, value) => setValue(value)} onClear={() => setValue('')} />;
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
    maxRows: { type: 'number', min: 1 },
  },
  render: props => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(console.log)}>
          <TextareaUncontrolled {...props} name="test" />
        </form>
      </FormProvider>
    );
  },
};
