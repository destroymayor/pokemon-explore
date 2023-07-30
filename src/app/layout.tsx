import 'tailwindcss/tailwind.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pokemon Explore',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex min-h-screen items-center flex-col">
        <header className="bg-zinc-200 py-20 w-full">
          <div className="max-w-5xl px-6 flex items-center justify-between mx-auto w-full">
            <h1 className="text-3xl">Pokemon Explore</h1>
            <Link href={'https://github.com/destroymayor/pokemon-explore'}>
              <span className="hover:bg-zinc-300 p-2 rounded-full cursor-pointer">Github</span>
            </Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
