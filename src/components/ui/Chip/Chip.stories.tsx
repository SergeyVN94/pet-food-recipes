/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { IconCheckSmall, IconMenu, IconSearch } from '@/assets/icons';

import { Chip } from '.';

const meta: Meta<typeof Chip> = {
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    variant: 'filled',
    disabled: false,
    label: 'Label',
  },
  argTypes: {
    label: { type: 'string' },
    onClose: {
      control: { type: 'boolean' },
      mapping: {
        false: undefined,
        true: () => alert('click'),
      },
    },
    iconLeft: {
      control: { type: 'select' },
      options: ['none', 'check', 'search', 'menu'],
      mapping: {
        none: undefined,
        search: <IconSearch />,
        menu: <IconMenu />,
        check: <IconCheckSmall />,
      },
    },
  },
  render: props => {
    return <Chip {...props} />;
  },
};
