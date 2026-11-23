import type { JSX } from "react";

export function SiteFooter(): JSX.Element {
  return (
    <footer
      id="acerca-de"
      className="mt-24 border-t border-neutral-300 bg-blue-500 text-neutral-0"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-xs font-bold">Explorer App</p>
          <p className="mt-2 text-sm font-light text-neutral-50">
            © 2026 Explorer App. Datos proporcionados por REST Countries.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap gap-6 text-xs font-semibold">
            <li>
              <a
                href="https://github.com/Kcruz080492/ExplorerApp#readme"
                className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
              >
                Documentación
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Kcruz080492/explorer-react"
                className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
              >
                Código fuente
              </a>
            </li>
            <li>
              <a
                href="#acerca-de"
                className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
              >
                Privacidad
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
