import type { Meta, StoryObj } from '@storybook/react';

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
      labels: {
        filled: 'filled',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  render: (props) => (
    <Button type="button" {...props}>
      Click me!
    </Button>
  ),
};
