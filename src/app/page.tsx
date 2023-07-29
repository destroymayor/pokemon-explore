import Search from '@/components/Search';
import PokemonType from '@/components/PokemonType';
import Pokemons from '@/components/Pokemons';
import PokemonInfo from '@/components/PokemonInfo';

export default function Home() {
  return (
    <div className="flex lg:flex-row flex-col p-6 lg:px-4 lg:py-0 w-full gap-10 max-w-5xl">
      <div className="flex gap-2 flex-col lg:pr-10 lg:border-r lg:pt-10">
        <Search />
        <PokemonType />
      </div>
      <div className="flex-1 lg:pt-10">
        <Pokemons />
        <PokemonInfo />
      </div>
    </div>
  );
}
