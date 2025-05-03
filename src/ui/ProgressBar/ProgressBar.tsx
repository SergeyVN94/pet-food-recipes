import React from 'react';

import { clampNumber, cn } from '@/utils';

type ProgressBarProps = {
  value: number;
  className?: string;
};

const ProgressBar = ({ value, className }: ProgressBarProps) => (
  <div className={cn('py-1', className)}>
    <div className="relative overflow-hidden rounded-lg py-0.5 bg-secondary-container">
      <div className="absolute top-0 left-0 h-full bg-primary transition-all" style={{ right: `${100 - clampNumber(value, 0, 100)}%` }} />
    </div>
  </div>
);

export default ProgressBar;
