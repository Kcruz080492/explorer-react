// App.tsx — integra navegación, búsqueda y filtrado de países.
import { useEffect, useState } from "react";
import type { ChangeEvent, JSX } from "react";

import { SiteHeader } from "./components/organisms/SiteHeader";
import { Header } from "./components/organisms/Header";
import { CountryGrid } from "./components/organisms/CountryGrid";
import { LoadingState, EmptyState, ErrorState } from "./components/organisms/CountryStates";

import { fetchCountries } from "./api/countries";
import { filterCountries } from "./utils/filter";
import type { Country } from "./types/country";
import type { AppState } from "./utils/app-state";

const INITIAL_VISIBLE_COUNTRIES: number = 8;

export default function App(): JSX.Element {
  // Conservan los criterios seleccionados por el usuario.
  const [state, setState] = useState<AppState>({ status: "loading" });

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let active: boolean = true;

    async function load(): Promise<void> {
      setState({ status: "loading" });

      try {
        const countries: Country[] = await fetchCountries(
          controller.signal,
        );

        if (active) {
          setState({
            status: "success",
            data: countries,
          });
        }
      } catch (error: unknown) {
        if (!active || controller.signal.aborted) return;

        console.error("Error al cargar los países:", error);

        setState({
          status: "error",
          message:
            "Verifica tu conexión e inténtalo nuevamente.",
        });
      }
    }

    void load();

    // Cleanup: cancela la solicitud pendiente.
    return () => {
      active = false;
      controller.abort();
    };
  }, [retryCount]);

  // Espera 300 ms antes de aplicar la búsqueda.
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => setDebouncedQuery(query),
      300,
    );

    return () => clearTimeout(timer);
  }, [query]);

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

  function handleRetry(): void {
    setRetryCount((previous: number) => previous + 1);
  }

  // function handleClearFilters(): void {
  //   setQuery("");
  //   setRegion("");
  // }

  function handleSelect(code: string): void {
    // El detalle se conectará cuando trabajemos el enrutamiento.
    console.log("País seleccionado:", code);
  }

  let content: JSX.Element;

  if (state.status === "loading") {
    content = <LoadingState />;
  } else if (state.status === "error") {
    content = (
      <ErrorState
        message={state.message}
        onRetry={handleRetry}
      />
    );
  } else {
    const filtered: Country[] = filterCountries(
      state.data,
      debouncedQuery,
      region,
    );


    const hasFilters: boolean =
      debouncedQuery.trim() !== "" || region !== "";

    const visibleCountries: Country[] = hasFilters
      ? filtered
      : filtered.slice(0, INITIAL_VISIBLE_COUNTRIES);

    content =
      visibleCountries.length > 0 ? (
        <CountryGrid
          countries={visibleCountries}
          onSelect={handleSelect}
        />
      ) : (
        <EmptyState query={debouncedQuery} />
      );
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
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_16rem_auto] lg:items-end">


          <div className="relative">
            <label
              htmlFor="country-search"
              className="sr-only"
            >
              Buscar un país
            </label>

            <span
              className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-neutral-600"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  strokeWidth="2"
                />
                <path
                  d="m16 16 4 4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <input
              id="country-search"
              name="country-search"
              type="search"
              placeholder="Buscar un país..."
              autoComplete="off"
              value={query}
              onChange={handleQueryChange}
              className="h-12 w-full rounded-full border border-teal-500 bg-neutral-0 py-3 pl-12 pr-5 text-base text-neutral-900 placeholder:text-neutral-600 transition-colors duration-200 hover:border-blue-500 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            />
          </div>



          <div>
            <label
              htmlFor="region-filter"
              className="mb-2 block font-semibold">
              Filtrar por región
            </label>

            <select
              id="region-filter"
              name="region-filter"
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
            <span
              className="pointer-events-none absolute right-5 top-1/2 size-2.5 -translate-y-2/3 rotate-45 border-b-2 border-r-2 border-neutral-900"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* Destino del enlace Explorar países. */}
        <section id="paises" aria-labelledby="countries-title">
          <h2
            id="countries-title"
            className="mb-6 text-(length:--font-country-name) font-semibold md:mb-8 md:text-3xl"
          >
            Países destacados
          </h2>



          {/* Estados de carga, error y resultados. */}
          {state.status === "loading" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
              {content}
            </div>
          ) : (
            content
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