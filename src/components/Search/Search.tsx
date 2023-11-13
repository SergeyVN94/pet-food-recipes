'use client';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

type SearchProps = {
  onChange: (value: string) => void;
  delay?: number;
  initialValue?: string;
};

const Search = ({ delay, initialValue, onChange }: SearchProps) => {
  const [value, setInputValue] = useState(initialValue ?? '');

  const handleChangeWithDelay = useMemo(
    () => (delay !== undefined && delay > 0) ? debounce(onChange, delay) : onChange,
    [onChange, delay]
  );

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const nextValue = ev.target.value;
      setInputValue(nextValue)
      handleChangeWithDelay(nextValue);
    },
    [handleChangeWithDelay]
  );

  return (
    <input
      className="py-2 px-3 border border-gray-400 rounded outline-none focus:border-2"
      type="search"
      onChange={handleChange}
      value={value}
    />
  );
};

export default Search;
