/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { IconAdd } from '@/assets/icons';
import { Input } from '.';

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Filled: Story = {
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

    return <Input {...props} />;
  },
};
