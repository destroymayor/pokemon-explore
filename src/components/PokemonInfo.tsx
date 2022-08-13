import Image from 'next/future/image';

import usePokemonInfo from '@/hooks/use-pokemon-info.hook';
import usePokemonState from '@/hooks/use-pokemon-state.hook';

import useScrollDisabler from '@/hooks/use-scroll-disabler.hook';

import InPortal from '@/components/InPortal';

export default function PokemonInfo() {
  const pokemonState = usePokemonState();
  const { open, id } = pokemonState.dialog;
  const { data, isLoading } = usePokemonInfo({ open, id });

  useScrollDisabler(open);

  if (!open) return null;

  const height = data?.height && `${data?.height / 10} m`;
  const weight = data?.weight && `${data?.weight / 10} kg`;

  return (
    <InPortal>
      <div className="fixed inset-0 bg-zinc-900/80" />
      <div className="flex fixed inset-0 mt-[10vh] mx-auto max-w-2xl h-[500px] bg-zinc-50 rounded-md shadow-xl">
        <div className="px-6 relative min-w-[150px] rounded-l-md grid place-items-center bg-zinc-100">
          {!isLoading && (
            <Image
              className="absolute -right-8"
              alt={data?.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`}
              width={150}
              height={150}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 flex-[3] p-6 pl-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">{data?.name}</h1>
              <span className="text-zinc-500">#{data?.id}</span>
            </div>

            <button
              className="hover:bg-zinc-200 p-1 rounded-full"
              onClick={() => pokemonState.setDialogOpen(!pokemonState.dialog.open)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <ul className="flex items-center gap-2">
            {data?.types?.map((item) => (
              <li key={item.type.name} className="py-1 px-2 rounded-md bg-zinc-200">
                {item.type.name[0].toLocaleUpperCase() + item.type.name.substring(1)}
              </li>
            ))}
          </ul>

          <div className="flex gap-20 items-center">
            <div className="flex flex-col">
              <span>Height</span>
              <span>{height}</span>
            </div>
            <div className="flex flex-col">
              <span>Weight</span>
              <span>{weight}</span>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <span>Stats</span>
              <ul className="flex flex-col gap-2">
                {data?.stats.map((item) => (
                  <li className="flex items-center gap-2 text-sm" key={item.stat.name}>
                    <span>{item.stat.name.toLocaleUpperCase()}</span>
                    <span>{item.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <span>Abilities</span>
              <ul className="flex flex-col items-start gap-2">
                {data?.abilities.map((item) => (
                  <li key={item.ability.name} className="bg-zinc-200 rounded-md px-1">
                    {item.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </InPortal>
  );
}
