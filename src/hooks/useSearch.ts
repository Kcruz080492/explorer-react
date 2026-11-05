// src/hooks/useSearch.ts — Búsqueda, debounce y filtrado.
import { useEffect, useState } from "react";
import { filterCountries } from "../utils/filter";
import type { Country } from "../types/country";

const INITIAL_VISIBLE_COUNTRIES: number = 8;

interface UseSearchResult {
  query: string;
  debouncedQuery: string;
  region: string;
  visibleCountries: Country[];
  setQuery: (value: string) => void;
  setRegion: (value: string) => void;
}

export function useSearch(
  countries: Country[],
): UseSearchResult {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  // Espera 300 ms después del último cambio de búsqueda.
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(
      () => setDebouncedQuery(query),
      300,
    );

    return () => clearTimeout(timer);
  }, [query]);

  // Reutiliza el filtrado que ya funciona en Explorer App.
  const filtered: Country[] = filterCountries(
    countries,
    debouncedQuery,
    region,
  );

  const hasFilters: boolean =
    debouncedQuery.trim() !== "" || region !== "";

  const visibleCountries: Country[] = hasFilters
    ? filtered
    : filtered.slice(0, INITIAL_VISIBLE_COUNTRIES);

  return {
    query,
    debouncedQuery,
    region,
    visibleCountries,
    setQuery,
    setRegion,
  };
}