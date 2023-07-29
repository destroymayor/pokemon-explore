'use client';

import { Suspense } from 'react';
import usePokemons from '@/hooks/use-pokemons.hook';

import PokemonItem from './PokemonItem';

export default function Pokemons() {
  const { isLoading, pokemonTotalCount, pokemons } = usePokemons();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <span>{pokemonTotalCount} Pokemons</span>

      <ul className="min-h-screen grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pokemons?.map((pokemon) => {
          const id = pokemon?.id;
          const name = pokemon.name[0].toLocaleUpperCase() + pokemon.name.substring(1);

          return (
            <Suspense key={id} fallback={<div>loading...</div>}>
              <PokemonItem id={id} name={name} />
            </Suspense>
          );
        })}
      </ul>
    </div>
  );
}
