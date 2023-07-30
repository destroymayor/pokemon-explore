import useSWR from 'swr';

import usePokemonState from '@/hooks/use-pokemon-state.hook';

import fetcher from '@/lib/fetcher';

const POKE_TYPE_API = `https://pokeapi.co/api/v2/type`;
interface IPokemonType {
  pokemon: Array<{
    pokemon: {
      name: string;
      id: number;
      url: string;
    };
  }>;
}

export default function usePokemonByType() {
  const { searchType } = usePokemonState((state) => ({ searchType: state.searchType }));

  const url = `${POKE_TYPE_API}/${searchType}`;

  const { data, error, isLoading } = useSWR<IPokemonType>(url, fetcher, {
    revalidateOnFocus: false,
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
  const isEmpty = pokemons?.length === 0;

  return {
    pokemonTotalCount,
    pokemons,
    isLoading,
    isEmpty,
    isError,
  };
}
