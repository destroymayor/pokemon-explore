import Image from 'next/future/image';
import usePokemons from '@/hooks/use-pokemons.hook';
import usePokemonState from '@/hooks/use-pokemon-state.hook';

export default function Pokemons() {
  const { isLoading, pokemonTotalCount, pokemons } = usePokemons();

  const pokemonState = usePokemonState();

  const handleSelectItem = (id: number) => {
    pokemonState.setDialogOpen(true);
    pokemonState.setDialogSelectedId(id);
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-4 pb-10">
      <span>{pokemonTotalCount} Pokemons</span>

      <ul className="min-h-screen grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pokemons?.map((pokemon) => {
          const id = pokemon?.id;
          const name = pokemon.name[0].toLocaleUpperCase() + pokemon.name.substring(1);

          return (
            <li
              key={pokemon.name}
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
        })}
      </ul>
    </div>
  );
}
