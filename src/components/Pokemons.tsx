'use client';

import usePokemons from '@/hooks/use-pokemons.hook';

import PokemonItem, { PokemonItemPlaceholder } from './PokemonItem';

export default function Pokemons() {
  const { isLoading, pokemonTotalCount, pokemons } = usePokemons();

  return (
    <div className="flex flex-col gap-4 pb-10">
      {isLoading ? <span>Loading...</span> : <span>{pokemonTotalCount} Pokemons</span>}

      <ul className="min-h-screen grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <PokemonItemPlaceholder />
            <PokemonItemPlaceholder />
            <PokemonItemPlaceholder />
          </>
        ) : (
          <>
            {pokemons?.map((pokemon) => (
              <PokemonItem
                key={pokemon?.id}
                id={pokemon?.id}
                name={pokemon.name[0].toLocaleUpperCase() + pokemon.name.substring(1)}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
