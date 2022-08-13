import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const POKE_API = `https://pokeapi.co/api/v2/pokemon`;

interface Props {
  open: boolean;
  id?: number;
}

type Types = {
  type: {
    name: string;
  };
};

type Abilities = {
  ability: {
    name: string;
  };
};

type Stats = {
  stat: {
    name: string;
  };
  base_stat: number;
};

interface IPokemonInfo {
  name: string;
  id: number;
  types: Types[];
  height: number;
  weight: number;
  abilities: Abilities[];
  stats: Stats[];
}

export default function usePokemonInfo(props: Props) {
  const { open, id = 1 } = props;
  const url = `${POKE_API}/${id}`;

  const { data, error } = useSWR<IPokemonInfo>(open ? url : null, fetcher);

  return { data, isLoading: !error && !data, error };
}
