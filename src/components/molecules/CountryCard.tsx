// CountryCard.tsx — compone la tarjeta y comunica una selección.
import type { JSX } from "react";
import type { Country } from "../../types/country";
import {
  formatPopulation,
  getCapital,
  getFlagDescription,
} from "../../utils/format";
import { Badge } from "../atoms/Badge";
import { Flag } from "../atoms/Flag";

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
}

export function CountryCard({
  country,
  onSelect,
}: CountryCardProps): JSX.Element {
  const capital: string = getCapital(country);
  const flagDescription: string = getFlagDescription(country);
  const formattedPopulation: string = formatPopulation(country.population);

  return (
    <article className="@container group flex w-full flex-col overflow-hidden rounded-lg bg-neutral-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-row @min-[20rem]:flex-col">
        <Flag src={country.flag.url_svg} alt={flagDescription} />
        <div className="flex min-w-0 w-3/5 flex-1 flex-col p-5 @min-[20rem]:w-full">
          <h2 className="text-(length:--font-country-name) font-bold text-neutral-900 dark:text-white">
            {country.names.common}
          </h2>
          <dl className="mt-4 space-y-3 text-base text-neutral-900 dark:text-slate-200">
            <div className="grid grid-cols-[84px_1fr] gap-3">
              <dt className="font-semibold">Población:</dt>
              <dd>{formattedPopulation}</dd>
            </div>
            <div className="grid grid-cols-[84px_1fr] gap-3">
              <dt className="font-semibold">Región:</dt>
              <dd><Badge region={country.region} /></dd>
            </div>
            <div className="grid grid-cols-[84px_1fr] gap-3">
              <dt className="font-semibold">Capital:</dt>
              <dd>{capital}</dd>
            </div>
          </dl>
          {/* La selección comunica al padre el código del país. */}
          <button
            type="button"
            className="mt-6 flex min-h-11 w-full items-center justify-center rounded-full 
            bg-orange-500 px-5 py-2 text-lg font-medium text-neutral-900 transition-all duration-200 
            hover:bg-orange-600 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-32"
            onClick={() => onSelect(country.codes.alpha_2)}
          >
            Ver más
          </button>
        </div>
      </div>
    </article>
  );
}