import useSWR from 'swr';

import usePokemonState from '@/hooks/use-pokemon-state.hook';

import fetcher from '@/lib/fetcher';

interface IPokemonTypeItem {
  pokemon: {
    name: string;
    id: number;
    url: string;
  };
}

interface IPokemonType {
  pokemon: IPokemonTypeItem[];
}
const POKE_TYPE_API = `https://pokeapi.co/api/v2/type`;

export default function usePokemonByType() {
  const pokemonState = usePokemonState();

  const url = `${POKE_TYPE_API}/${pokemonState.searchType}`;

  const { data, error } = useSWR<IPokemonType>(url, fetcher, {
    revalidateOnFocus: false,
    suspense: true,
  });

  const pokemons = data?.pokemon?.map(({ pokemon }) => {
    const id = parseInt(pokemon.url.substring(34, pokemon.url.length - 1), 10);

    return {
      name: pokemon.name,
      url: pokemon.url,
      id,
    };
  });

  const pokemonTotalCount = pokemons?.length;
  const isError = !!error;
  const isLoading = !data?.pokemon && !isError;
  const isEmpty = pokemons?.length === 0;

  return {
    pokemonTotalCount,
    pokemons,
    isLoading,
    isEmpty,
    isError,
  };
}
