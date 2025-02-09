'use client';

import dynamic from 'next/dynamic';

export const UserControls = dynamic(() => import('./UserControls'), { ssr: false });
