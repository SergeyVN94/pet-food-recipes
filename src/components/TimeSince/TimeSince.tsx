'use client';

import React from 'react';

import { IconSchedule } from '@/assets/icons';
import { cn, getTimeSince } from '@/utils';

type TimeSinceProps = {
  startTime: string;
  icon?: React.JSX.Element | false;
  className?: string;
};

const TimeSince = ({ startTime, icon = <IconSchedule className="size-6" />, className }: TimeSinceProps) => {
  const [formattedTime, setFormattedTime] = React.useState(() => getTimeSince(startTime) ?? 'только что');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(getTimeSince(startTime) ?? 'только что');
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <p className={cn('title-s flex flex-nowrap items-center gap-1', className)}>
      {icon}
      <time dateTime={startTime} className="leading-5">
        {formattedTime}
      </time>
    </p>
  );
};

export default TimeSince;
