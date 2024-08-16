'use client';

import React from 'react';

import debounce from 'lodash/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IconSearch } from '@/assets/icons';

import { Input } from '../ui';

type SearchProps = {
  onChange?: (value: string) => void;
  delay?: number;
  defaultValue?: string;
  className?: string;
  searchParamName?: string;
  placeholder?: string;
  isClearable?: boolean;
};

const SearchBar = ({ delay, defaultValue, className, placeholder, onChange, isClearable = false, searchParamName = 'q' }: SearchProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [value, setInputValue] = React.useState(defaultValue ?? searchParams.get(searchParamName) ?? '');
  const pathname = usePathname();
  const searchParamsRef = React.useRef(searchParams);
  const pathRef = React.useRef(pathname);
  searchParamsRef.current = searchParams;
  pathRef.current = pathname;

  const handleQueryChange = React.useCallback(
    (query: string) => {
      if (searchParamName) {
        const params = new URLSearchParams(searchParamsRef.current);

        if (query) {
          params.set(searchParamName, query);
        } else {
          params.delete(searchParamName);
        }

        replace(`${pathRef.current}?${params.toString()}`);
      }
    },
    [replace, searchParamName],
  );

  const handleChangeWithDelay = React.useMemo(
    () => (delay !== undefined && delay > 0 ? debounce(handleQueryChange, delay) : handleQueryChange),
    [delay, handleQueryChange],
  );

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = ev.target.value;
    setInputValue(nextValue);
    handleChangeWithDelay(nextValue);

    if (onChange) {
      onChange(nextValue);
    }
  };

  const handleClear = isClearable
    ? () => {
        setInputValue('');
        handleQueryChange('');

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
    />
  );
};

export default SearchBar;
