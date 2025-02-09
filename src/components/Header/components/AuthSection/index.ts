'use client';

import dynamic from 'next/dynamic';

export const AuthSection = dynamic(() => import('./AuthSection'), { ssr: false });
