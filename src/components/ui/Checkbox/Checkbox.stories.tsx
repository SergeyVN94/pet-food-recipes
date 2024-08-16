/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Checkbox, CheckboxControlled } from '.';
import { Button } from '../Button';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const DefaultUncontrolled: Story = {
  args: {
    disabled: false,
    isIndeterminate: true,
  },
  argTypes: {},
  render: props => {
    const [checked, setChecked] = React.useState<boolean | null>(false);

    const handleChange = (value: boolean | null) => {
      setChecked(value);
      console.log(value);
    };

    return (
      <Checkbox
        {...props}
        isIndeterminate={props.isIndeterminate as any}
        name="story"
        value={checked}
        label="checkbox"
        onChange={(ev: any, value: boolean | null) => handleChange(value)}
      />
    );
  },
};

export const DefaultControlled: Story = {
  args: {
    disabled: false,
    isIndeterminate: true,
  },
  argTypes: {},
  render: props => {
    const methods = useForm({
      defaultValues: {
        story: false,
      },
    });

    const handleSubmit = (fields: { story: boolean }) => {
      console.log(fields);
    };

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
          <CheckboxControlled {...props} name="story" label="checkbox" />
          <Button type="submit" className="self-start">
            submit
          </Button>
        </form>
      </FormProvider>
    );
  },
};
