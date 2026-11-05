// src/hooks/useCountries.ts — Gestiona la carga y el reintento.
import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";
import type { Country } from "../types/country";
import type { AppState } from "../utils/app-state";

interface UseCountriesResult {
  state: AppState;
  retry: () => void;
}

export function useCountries(): UseCountriesResult {
  const [state, setState] = useState<AppState>({
    status: "loading",
  });

  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let active: boolean = true;

    async function load(): Promise<void> {
      setState({ status: "loading" });

      try {
        // Reutilizamos el servicio existente.
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
          message: "Verifica tu conexión e inténtalo nuevamente.",
        });
      }
    }

    void load();

    // Cancela la petición al limpiar el efecto.
    return () => {
      active = false;
      controller.abort();
    };
  }, [retryCount]);

  function retry(): void {
    setRetryCount((previous: number) => previous + 1);
  }

  return { state, retry };
}