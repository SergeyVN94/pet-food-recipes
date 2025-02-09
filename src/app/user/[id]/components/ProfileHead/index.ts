'use client';

import dynamic from 'next/dynamic';

export const ProfileHead = dynamic(() => import('./ProfileHead'), { ssr: false });
