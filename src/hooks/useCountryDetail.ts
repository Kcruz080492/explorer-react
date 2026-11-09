import { useEffect, useState } from "react";
import { fetchCountryByCode } from "../api/countries";
import type { CountryDetail } from "../types/country-detail";

type CountryDetailState =
  | { status: "loading" }
  | { status: "success"; country: CountryDetail }
  | { status: "error"; message: string };

interface UseCountryDetailResult {
  state: CountryDetailState;
  retry: () => void;
}

interface StoredCountryDetailState {
  code: string | undefined;
  retryCount: number;
  state: CountryDetailState;
}

export function useCountryDetail(
  code: string | undefined,
): UseCountryDetailResult {
  const normalizedCode: string | undefined = code?.trim().toUpperCase() || undefined;
  const [storedState, setStoredState] = useState<StoredCountryDetailState>({
    code: undefined,
    retryCount: 0,
    state: { status: "loading" },
  });
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    let active: boolean = true;

    if (!normalizedCode) {
      return () => {
        active = false;
      };
    }

    const requestedCode: string = normalizedCode;

    async function loadCountry(): Promise<void> {
      try {
        // La consulta comparte la carga del JSON; la vigencia evita respuestas obsoletas.
        const country: CountryDetail = await fetchCountryByCode(requestedCode);

        if (active) {
          setStoredState({
            code: requestedCode,
            retryCount,
            state: { status: "success", country },
          });
        }
      } catch (error: unknown) {
        if (!active) {
          return;
        }

        const notFound: boolean =
          error instanceof Error &&
          error.message ===
            "No se encontró el país solicitado en los datos de la demo.";

        if (!notFound) {
          console.error("Error al consultar el país:", error);
        }

        setStoredState({
          code: requestedCode,
          retryCount,
          state: {
            status: "error",
            message: notFound
              ? "No se encontró el país solicitado."
              : error instanceof Error
                ? error.message
                : "No se pudo cargar la información del país.",
          },
        });
      }
    }

    void loadCountry();

    return () => {
      active = false;
    };
  }, [normalizedCode, retryCount]);

  function retry(): void {
    setRetryCount((previous: number) => previous + 1);
  }

  const state: CountryDetailState = !normalizedCode
    ? {
        status: "error",
        message: "No se proporcionó el código del país.",
      }
    : storedState.code === normalizedCode &&
        storedState.retryCount === retryCount
      ? storedState.state
      : { status: "loading" };

  return { state, retry };
}
