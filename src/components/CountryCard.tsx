import type { JSX, SyntheticEvent } from "react";
import type { Country } from "../types/country";
import {
  formatPopulation,
  getCapital,
  getFlagDescription,
} from "../utils/format";

interface CountryCardProps {
  country: Country;
}

// Evita repetir el cambio si también falla la imagen de respaldo.
function handleFlagError(event: SyntheticEvent<HTMLImageElement>): void {
  const image: HTMLImageElement = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = `${import.meta.env.BASE_URL}placeholder.png`;
}

export function CountryCard({ country }: CountryCardProps): JSX.Element {
  const capital: string = getCapital(country);
  const flagDescription: string = getFlagDescription(country);
  const formattedPopulation: string = formatPopulation(country.population);
  const flagUrl: string =
    country.flag.url_svg || `${import.meta.env.BASE_URL}placeholder.png`;

  return (
    <article className="@container group flex w-full flex-col overflow-hidden rounded-lg bg-neutral-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">
      <div className="flex flex-col @min-[20rem]:flex-row">
        <img
          className="aspect-3/2 w-full shrink-0 object-cover @min-[20rem]:aspect-auto @min-[20rem]:w-2/5"
          src={flagUrl}
          alt={flagDescription}
          loading="lazy"
          onError={handleFlagError}
        />
        <div className="flex min-w-0 flex-1 flex-col p-5 @min-[20rem]:w-3/5">
          {/* El contenido se obtiene de las props, sin construir un string HTML. */}
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
              <dd>{country.region}</dd>
            </div>
            <div className="grid grid-cols-[84px_1fr] gap-3">
              <dt className="font-semibold">Capital:</dt>
              <dd>{capital}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
