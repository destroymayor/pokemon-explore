import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const POKE_API = `https://pokeapi.co/api/v2/pokemon`;

interface IPokemonInfo {
  name: string;
  id: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
}

export default function usePokemonInfo(props: { open: boolean; id?: number }) {
  const { open, id = 1 } = props;
  const url = `${POKE_API}/${id}`;

  const { data, error } = useSWR<IPokemonInfo>(open ? url : null, fetcher);

  return { data, isLoading: !error && !data, error };
}
