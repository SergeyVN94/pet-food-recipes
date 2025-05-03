import type { Meta, StoryObj } from '@storybook/react';

import { IconAdd } from '@/assets/icons';

import { ButtonIcon } from '.';

const meta: Meta<typeof ButtonIcon> = {
  component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const FilledButtonIcon: Story = {
  args: {
    variant: 'standard',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['standard', 'filled'],
    },
  },
  render: props => <ButtonIcon {...props} icon={IconAdd} />,
};
