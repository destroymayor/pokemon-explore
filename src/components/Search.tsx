import usePokemonState from '@/hooks/use-pokemon-state.hook';

export default function Search() {
  const searchValue = usePokemonState((state) => state.searchValue);
  const setSearchValue = usePokemonState((state) => state.setSearchValue);

  const handleChange = (e: { target: HTMLInputElement }) => setSearchValue(e.target?.value);

  return (
    <div>
      <input
        className="p-2 border rounded-md w-full focus:outline-none"
        placeholder="Search ID or Name"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}
