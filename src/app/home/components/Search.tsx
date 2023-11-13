'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Search as SearchBase } from '@/components';

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useCallback(
    (nextQuery: string) => {
      const nextParams = new URLSearchParams(searchParams as any);

      if (nextQuery) {
        nextParams.set('q', nextQuery);
      } else {
        nextParams.delete('q');
      }

      replace(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  return <SearchBase onChange={handleChange} initialValue={searchParams.get('q') ?? ''} delay={350} />;
};

export default Search;
