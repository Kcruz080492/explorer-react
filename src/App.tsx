import type { JSX } from "react";
import { CountryCard } from "./components/CountryCard";
import { elSalvador , japon, canada } from "./data/countries-demo";
export default function App(): JSX.Element {
  return (

      <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-(length:--font-page-title) font-semibold">
          Explora países del mundo
        </h1>
        <p className="mt-3 mb-8 text-neutral-600 dark:text-slate-300">
          Primera versión en React con datos locales.
        </p>
        <section
          aria-label="Países de ejemplo"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >

        <CountryCard country={elSalvador} />
        <CountryCard country={japon} />
        <CountryCard country={canada} />
        </section>
      </div>
    </main>
  );
}
