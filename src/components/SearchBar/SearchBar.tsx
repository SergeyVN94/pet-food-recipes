'use client';

import React from 'react';

import debounce from 'debounce';
import { useQueryState } from 'nuqs';

import { IconCancel, IconSearch } from '@/assets/icons';
import { ButtonIcon } from '@/ui';
import { cn } from '@/utils';

type SearchProps = {
  searchParamName?: string;
  className?: string;
  initialValue?: string;
  delay?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({ delay, className, placeholder, onChange, searchParamName, initialValue = '' }: SearchProps) => {
  const [paramValue, setParamValue] = useQueryState(searchParamName ?? '');
  const [localValue, setLocalValue] = React.useState(paramValue || initialValue || '');
  // TODO: Доработать выпадающий список с подсказками
  const [isFocus, setIsFocus] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setDebounceQuery = React.useMemo(() => {
    const changeQuery = (value: string) => {
      onChangeRef.current?.(value);

      if (searchParamName) {
        setParamValue(value);
      }
    };

    return delay ? debounce(changeQuery, delay) : changeQuery;
  }, [delay, setParamValue, searchParamName]);

  const handleSearch = () => {
    setDebounceQuery(localValue);
  };

  const handleRootClick: React.MouseEventHandler<HTMLDivElement> = ev => {
    if (!(ev.target instanceof HTMLDivElement) || ev.target.getAttribute('data-type') !== 'root') {
      return;
    }

    inputRef.current?.focus();
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setLocalValue(value);
    setDebounceQuery(value);
  };

  const handleClear = () => {
    setLocalValue('');
    setDebounceQuery('');
  };

  return (
    <div
      className={cn(
        'p-1 pl-4 rounded-3xl overflow-hidden bg-surf-cont-high flex flex-nowrap items-center gap-1 hover:bg-on-surface-var/25 data-[focus="true"]:bg-on-surface-var/hover:bg-on-surface-var/25 transition-colors',
        className,
      )}
      onClick={handleRootClick}
      data-type="root"
      data-focus={isFocus}
    >
      <label className="py-3 block flex-1">
        <input
          ref={inputRef}
          className="w-full outline-hidden bg-transparent body-l text-on-surface-var autofill:shadow-[inset_0_0_0px_1000px_rgb(230,224,233)]"
          onChange={handleChange}
          value={localValue}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </label>
      <div className="flex flex-nowrap">
        <ButtonIcon
          className="data-[hidden='true']:hidden"
          onClick={handleClear}
          type="button"
          layoutSize={48}
          icon={IconCancel}
          data-hidden={!Boolean(localValue)}
        />
        <ButtonIcon onClick={handleSearch} type="button" layoutSize={48} icon={IconSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
