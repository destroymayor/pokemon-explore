'use client';

import usePokemonState from '@/hooks/use-pokemon-state.hook';

export default function Search() {
  const { searchValue, setSearchValue } = usePokemonState((state) => ({
    searchValue: state.searchValue,
    setSearchValue: state.setSearchValue,
  }));

  const handleChange = (e: { target: HTMLInputElement }) => setSearchValue(e.target?.value);

  return (
    <input
      className="p-2 border rounded-md w-full focus:outline-none"
      placeholder="Search ID or Name"
      value={searchValue}
      onChange={handleChange}
    />
  );
}
