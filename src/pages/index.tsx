import { Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import Search from '@/components/Search';
import PokemonType from '@/components/PokemonType';

const Pokemons = dynamic(() => import('@/components/Pokemons'), { ssr: false });
const PokemonInfo = dynamic(() => import('@/components/PokemonInfo'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon Explore</title>
      </Head>
      <div className="flex min-h-screen items-center flex-col">
        <header className="flex flex-col bg-zinc-200 px-6 lg:px-4 py-20 w-full">
          <div className="max-w-5xl flex items-center justify-between mx-auto w-full">
            <h1 className="text-3xl">Pokemon Explore</h1>
            <Link href={'https://github.com/destroymayor/pokemon-explore'}>
              <span className="hover:bg-zinc-300 p-2 rounded-full cursor-pointer">
                <svg
                  className="w-6 h-6 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </span>
            </Link>
          </div>
        </header>
        <main className="flex lg:flex-row flex-col p-6 lg:px-4 lg:py-0 w-full gap-10 max-w-5xl">
          <div className="flex gap-2 flex-col lg:pr-10 lg:border-r lg:pt-10">
            <Search />
            <PokemonType />
          </div>
          <div className="flex-1 lg:pt-10">
            <Suspense fallback={<div>loading...</div>}>
              <Pokemons />
            </Suspense>
            <PokemonInfo />
          </div>
        </main>
      </div>
    </>
  );
}
