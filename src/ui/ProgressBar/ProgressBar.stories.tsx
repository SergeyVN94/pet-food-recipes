/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '.';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 92,
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
  render: props => <ProgressBar {...props} />,
};
