'use client';

import React from 'react';

import debounce from 'lodash/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

import { IconSearch } from '@/assets/icons';

import { Input } from '../ui';

type SearchProps = {
  onChange?: (value: string) => void;
  delay?: number;
  className?: string;
  searchParamName?: string;
  placeholder?: string;
  isClearable?: boolean;
};

const SearchBar = ({ delay, className, placeholder, onChange, isClearable = false, searchParamName = 'q' }: SearchProps) => {
  const [search, setSearch] = useQueryState(searchParamName);
  const [value, setValue] = React.useState(search ?? '');
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setQuery = React.useMemo(() => {
    const changeQuery = (query: string) => {
      setSearch(query || null);
      onChangeRef.current?.(query);
    };

    return delay ? debounce(changeQuery, delay) : changeQuery;
  }, [delay, searchParamName, setSearch]);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, nextValue: string) => {
    setValue(nextValue);
    setQuery(nextValue);
  };

  const handleClear = isClearable
    ? () => {
        setValue('');
        setQuery('');

        if (onChange) {
          onChange('');
        }
      }
    : undefined;

  return (
    <Input
      className={className}
      name="search"
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      iconLeft={<IconSearch />}
      onClear={handleClear}
      autoComplete="off"
      variant="outline"
    />
  );
};

export default SearchBar;
