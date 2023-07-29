'use client';

import Image from 'next/image';
import usePokemonState from '@/hooks/use-pokemon-state.hook';

export default function PokemonItem(props: { name: string; id: number }) {
  const { name, id } = props;

  const { setDialogOpen, setDialogSelectedId } = usePokemonState((state) => ({
    setDialogOpen: state.setDialogOpen,
    setDialogSelectedId: state.setDialogSelectedId,
  }));

  const handleSelectItem = (id: number) => {
    setDialogOpen(true);
    setDialogSelectedId(id);
  };

  return (
    <li
      className="flex flex-col gap-4 shadow-xl rounded-lg p-6 transition duration-200 ease-in-out hover:scale-[1.05] cursor-pointer"
      onClick={() => handleSelectItem(id)}
    >
      <div className="self-center rounded-full p-4">
        <Image
          priority
          className="w-[100px] h-[100px]"
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col items-start">
        <span className="text-zinc-500 text-sm">#{id}</span>
        <span className="text-lg font-semibold">{name}</span>
      </div>
    </li>
  );
}
