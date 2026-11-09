import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { Flag } from "../components/atoms/Flag";
import { useCountryDetail } from "../hooks/useCountryDetail";
import type { CountryDetail } from "../types/country-detail";
import { getCapital, getFlagDescription, formatPopulation } from "../utils/format";
import { getCountryAlpha2 } from "../utils/country-codes";

interface CountryFieldProps {
  label: string;
  value: string;
}

function CountryField({ label, value }: CountryFieldProps): JSX.Element {
  return (
    <div className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-1 text-sm leading-6">
      <dt className="font-semibold">{label}:</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function getNativeName(country: CountryDetail): string {
  const nativeName: string | undefined = Object.values(
    country.names.native ?? {},
  )
    .map((name) => name.common ?? name.official)
    .find((name): name is string => Boolean(name));

  return nativeName ?? "Sin nombre nativo registrado";
}

export default function CountryDetailPage(): JSX.Element {
  const { code } = useParams<{ code: string }>();
  const { state, retry } = useCountryDetail(code);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* El enlace absoluto también funciona al abrir directamente esta ruta. */}
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-6 py-2 font-semibold text-neutral-900 transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          ← Atrás
        </Link>

        {state.status === "loading" ? (
          <p
            className="mt-12 text-center text-neutral-600"
            role="status"
            aria-live="polite"
          >
            Cargando información del país...
          </p>
        ) : state.status === "error" ? (
          <section
            className="mt-12 rounded-lg bg-neutral-0 p-6 shadow-sm"
            role="alert"
          >
            <h1 className="text-xl font-bold">No se pudo mostrar el país</h1>
            <p className="mt-2">{state.message}</p>
            {code?.trim() && (
              <button
                type="button"
                onClick={retry}
                className="mt-5 min-h-11 rounded-full bg-orange-500 px-5 py-2 font-semibold hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                Reintentar
              </button>
            )}
          </section>
        ) : (
          <CountryDetails country={state.country} />
        )}
      </main>

      <footer className="bg-blue-500 text-neutral-0">
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

interface CountryDetailsProps {
  country: CountryDetail;
}

function CountryDetails({ country }: CountryDetailsProps): JSX.Element {
  const currencies: string =
    country.currencies
      ?.map((currency) =>
        currency.symbol
          ? `${currency.name} (${currency.symbol})`
          : currency.name,
      )
      .join(", ") || "Sin moneda registrada";
  const languages: string =
    country.languages?.map((language) => language.name).join(", ") ||
    "Sin idiomas registrados";
  const domains: string =
    country.tlds?.filter(Boolean).join(", ") || "Sin dominio registrado";
  const borders: string[] = country.borders ?? [];

  return (
    <section
      aria-labelledby="detail-title"
      className="mt-10 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-12 lg:gap-14"
    >
      <Flag
        src={country.flag.url_svg}
        alt={getFlagDescription(country)}
        fit="contain"
        className="rounded-md bg-neutral-0 shadow-md"
      />

      <div className="min-w-0">
        <h1
          id="detail-title"
          className="text-(length:--font-page-title) font-bold"
        >
          {country.names.common}
        </h1>

        <div className="mt-5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          <dl className="space-y-1">
            <CountryField label="Nombre nativo" value={getNativeName(country)} />
            <CountryField
              label="Población"
              value={formatPopulation(country.population)}
            />
            <CountryField label="Región" value={country.region || "Sin región registrada"} />
            <CountryField
              label="Subregión"
              value={country.subregion || "Sin subregión registrada"}
            />
            <CountryField label="Capital" value={getCapital(country)} />
          </dl>

          <dl className="mt-1 space-y-1 sm:mt-0">
            <CountryField label="Dominio" value={domains} />
            <CountryField label="Moneda" value={currencies} />
            <CountryField label="Idiomas" value={languages} />
          </dl>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold">Países fronterizos:</h2>
          {borders.length === 0 ? (
            <p className="mt-3 text-sm">Sin fronteras terrestres</p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2">
              {borders.map((borderCode: string) => {
                const alpha2Code: string | undefined =
                  getCountryAlpha2(borderCode);

                return (
                  <li key={borderCode}>
                    {alpha2Code ? (
                      <Link
                        to={`/country/${encodeURIComponent(alpha2Code)}`}
                        className="inline-flex min-h-10 min-w-14 items-center justify-center rounded-md bg-neutral-0 px-4 py-2 text-sm shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        aria-label={`Ver ${borderCode}`}
                      >
                        {borderCode}
                      </Link>
                    ) : (
                      <span className="inline-flex min-h-10 min-w-14 items-center justify-center rounded-md bg-neutral-0 px-4 py-2 text-sm shadow-sm">
                        {borderCode}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
