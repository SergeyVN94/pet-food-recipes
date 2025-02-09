'use client';

import dynamic from 'next/dynamic';

export const RecipeBookmarkSelect = dynamic(() => import('./RecipeBookmarkSelect'), { ssr: false });
