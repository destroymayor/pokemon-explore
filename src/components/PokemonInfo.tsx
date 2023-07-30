'use client';

import Image from 'next/image';

import usePokemonInfo from '@/hooks/use-pokemon-info.hook';
import usePokemonState from '@/hooks/use-pokemon-state.hook';
import useScrollDisabler from '@/hooks/use-scroll-disabler.hook';

import InPortal from '@/components/InPortal';

export default function PokemonInfo() {
  const { dialog, setDialogOpen } = usePokemonState((state) => ({
    dialog: state.dialog,
    setDialogOpen: state.setDialogOpen,
  }));
  const { open, id } = dialog;
  const { data } = usePokemonInfo({ open, id });

  useScrollDisabler(open);

  if (!open) {
    return null;
  }

  const name = data?.name && `${data?.name[0].toLocaleUpperCase()}${data?.name.substring(1)}`;
  const height = data?.height && `${data?.height / 10} m`;
  const weight = data?.weight && `${data?.weight / 10} kg`;

  return (
    <InPortal>
      <div className="fixed inset-0 bg-zinc-900/80" />
      <div className="flex flex-col mx-10 sm:flex-row fixed inset-0 mt-[10vh] sm:mx-auto max-w-2xl h-[600px] sm:h-[450px] bg-zinc-50 rounded-md shadow-xl">
        <div className="px-6 relative min-h-[150px] sm:min-w-[180px] rounded-md sm:rounded-r-none grid place-items-center bg-zinc-100">
          <Image
            className="-bottom-8 sm:bottom-auto absolute sm:-right-8"
            alt={data?.name ?? 'pokemon'}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data?.id}.svg`}
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col justify-center gap-4 flex-[3] p-6 sm:pl-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">{name}</h1>
              <span className="text-sm text-zinc-500">#{data?.id}</span>
            </div>

            <button
              className="hover:bg-zinc-200 p-1 rounded-full"
              onClick={() => setDialogOpen(!dialog.open)}
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
