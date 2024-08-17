/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { IconMenu, IconSearch } from '@/assets/icons';

import { Input, InputControlled } from '.';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

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
    const [value, setValue] = useState('');

    return <Input {...props} value={value} onChange={(ev, value) => setValue(value)} onClear={() => setValue('')} />;
  },
};

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
  },
  render: props => {
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
