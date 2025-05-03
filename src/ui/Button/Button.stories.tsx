import type { Meta, StoryObj } from '@storybook/react';

import { IconAdd } from '@/assets/icons';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'text', 'elevated', 'tonal'],
    },
  },
  render: props => (
    <Button type="button" {...props}>
      Label
    </Button>
  ),
};

export const FilledWithIcon: Story = {
  args: {
    variant: 'filled',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline', 'text', 'elevated', 'tonal'],
    },
  },
  render: props => (
    <Button type="button" {...props} iconLeft={IconAdd}>
      Label
    </Button>
  ),
};
