import usePokemonState from '@/hooks/use-pokemon-state.hook';

import pokemonType from '@/constants/pokemon-type';

import clsx from 'clsx';

export default function PokemonType() {
  const searchType = usePokemonState((state) => state.searchType);
  const setSearchType = usePokemonState((state) => state.setSearchType);

  const handleSelect = (type: number) => setSearchType(type);

  return (
    <ul className="flex flex-row gap-2 flex-wrap lg:flex-col">
      {pokemonType?.map((item) => (
        <li
          className={clsx(
            'rounded-md cursor-pointer p-2 transition duration-300 ease-in-out',
            item.type === searchType
              ? 'text-sky-600 bg-sky-100 hover:text-sky-700'
              : 'text-zinc-500  hover:text-zinc-700'
          )}
          key={item.name}
          onClick={() => handleSelect(item.type)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
