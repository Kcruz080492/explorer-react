// App.tsx — integra navegación, búsqueda y filtrado de países.
import { useState } from "react";
import type { ChangeEvent, JSX } from "react";

import { SiteHeader } from "./components/organisms/SiteHeader";
import { Header } from "./components/organisms/Header";
import { CountryGrid } from "./components/organisms/CountryGrid";

import { countriesDemo } from "./data/countries-demo";
import { filterCountries } from "./utils/filter";
import type { Country } from "./types/country";

export default function App(): JSX.Element {
  // Conservan los criterios seleccionados por el usuario.
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  // Resultado derivado: se calcula nuevamente en cada render.
  const filteredCountries: Country[] = filterCountries(
    countriesDemo,
    query,
    region,
  );

  function handleQueryChange(
    event: ChangeEvent<HTMLInputElement>,
  ): void {
    setQuery(event.currentTarget.value);
  }

  function handleRegionChange(
    event: ChangeEvent<HTMLSelectElement>,
  ): void {
    setRegion(event.currentTarget.value);
  }

  function handleClearFilters(): void {
    setQuery("");
    setRegion("");
  }

  function handleSelect(code: string): void {
    // El detalle se conectará cuando trabajemos el enrutamiento.
    console.log("País seleccionado:", code);
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
      {/* Barra superior y menú móvil. */}
      <SiteHeader />

      {/* Destino del enlace Inicio. */}
      <main
        id="inicio"
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      >
        <Header title="Explora países del mundo">
          <p>
            Busca un país o filtra por región para consultar su información.
          </p>
        </Header>

        <section
          aria-label="Filtros de países"
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_16rem_auto] lg:items-end"
        >
          <div>
            <label
              htmlFor="country-search"
              className="mb-2 block font-semibold"
            >
              Buscar país
            </label>

            <input
              id="country-search"
              type="search"
              placeholder="Ejemplo: El Salvador"
              value={query}
              onChange={handleQueryChange}
              className="min-h-11 w-full rounded-sm border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="region-filter"
              className="mb-2 block font-semibold"
            >
              Filtrar por región
            </label>

            <select
              id="region-filter"
              value={region}
              onChange={handleRegionChange}
              className="min-h-11 w-full rounded-sm border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <option value="">Todas las regiones</option>
              <option value="Africa">África</option>
              <option value="Americas">América</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className="min-h-11 rounded-full bg-blue-500 px-5 py-2 font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Limpiar filtros
          </button>
        </section>

        {/* Destino del enlace Explorar países. */}
        <section id="paises" aria-labelledby="countries-title">
          <h2
            id="countries-title"
            className="mb-6 text-(length:--font-country-name) font-semibold md:mb-8 md:text-3xl"
          >
            Países destacados
          </h2>

          <p role="status" className="mb-4 text-sm">
            Mostrando {filteredCountries.length} de {countriesDemo.length} países.
          </p>

          {/* El grid recibe únicamente los países que cumplen los criterios. */}
          {filteredCountries.length > 0 ? (
            <CountryGrid
              countries={filteredCountries}
              onSelect={handleSelect}
            />
          ) : (
            <p className="rounded-md border border-neutral-300 p-6">
              No se encontraron países con esa búsqueda y región. Prueba otros
              filtros o utiliza «Limpiar filtros».
            </p>
          )}
        </section>
      </main>

      {/* Destino del enlace Acerca de. */}
      <footer
        id="acerca-de"
        className="mt-24 border-t border-neutral-300 bg-blue-500 text-neutral-0"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs font-bold">Explorer App</p>

          <p className="mt-2 text-sm font-light text-neutral-50">
            © 2026 Explorer App. Datos proporcionados por REST Countries.
          </p>
        </div>
      </footer>
    </div>
  );
}