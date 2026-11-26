// CountryCard.tsx — compone la tarjeta y comunica una selección.
import type { JSX } from "react";
import { Link } from "react-router-dom";
import type { Country } from "../../types/country";
import {
  formatPopulation,
  getCapital,
  getFlagDescription,
} from "../../utils/format";
import { Flag } from "../atoms/Flag";

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
  isIniatiallyVisible?: boolean;
}

export function CountryCard({
  country,
  onSelect,
  isIniatiallyVisible = false,
}: CountryCardProps): JSX.Element {
  const capital: string = getCapital(country);
  const flagDescription: string = getFlagDescription(country);
  const formattedPopulation: string = formatPopulation(country.population);
  const code: string = country.codes.alpha_2;

  return (
    <article className="@container group flex w-full flex-col overflow-hidden rounded-lg bg-neutral-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2">
      <div className="flex flex-col @min-[20rem]:flex-row">
        <Flag src={country.flag.url_svg} 
        alt={flagDescription}  
        loading={isIniatiallyVisible ? "eager" : "lazy"}/>
        <div className="flex min-w-0 flex-1 flex-col p-5 @min-[20rem]:w-3/5">
          <h2 className="text-(length:--font-country-name) font-bold text-neutral-900">
            {code ? (
              <Link
                to={`/country/${encodeURIComponent(code)}`}
                className="hover:text-blue-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {country.names.common}
              </Link>
            ) : country.names.common}
          </h2>
          <dl className="mt-4 space-y-3 text-base text-neutral-900">
            <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
              <dt className="font-semibold">Población:</dt>
              <dd>{formattedPopulation}</dd>
            </div>
            <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
              <dt className="font-semibold">Región:</dt>
              <dd>{country.region}</dd>
            </div>
            <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3">
              <dt className="font-semibold">Capital:</dt>
              <dd>{capital}</dd>
            </div>
          </dl>
          {/* La selección comunica al padre el código del país. */}
           {code ? (
          <button
            type="button"
            className="mt-6 flex min-h-11 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-lg font-medium text-neutral-900 transition-all duration-200 hover:bg-orange-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-32"
            aria-label={`Ver más información de ${country.names.common}`}
            onClick={() => onSelect(country.codes.alpha_2)}
          >
            Ver más
          </button>
           ) :(
             <p className="mt-6 text-sm text-neutral-600">
              Detalle no disponible para este país.
            </p>
           )}
        </div>
      </div>
    </article>
  );
}
