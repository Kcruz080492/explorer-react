// CountryDetailPage.tsx — punto de partida para la sesión de detalle.
import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function CountryDetailPage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <header className="bg-blue-500 text-neutral-0">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          >
            Explorer App
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* Link permite regresar al inicio sin recargar el documento. */}
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 py-2 font-semibold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          Volver al inicio
        </Link>

        <section
          aria-labelledby="detail-title"
          className="mt-8 rounded-xl border border-neutral-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
        >
          <h1
            id="detail-title"
            className="text-2xl font-bold sm:text-3xl"
          >
            Detalle del país
          </h1>

          <p className="mt-4 leading-relaxed">
            La navegación hacia esta página ya está configurada.
          </p>

          <p className="mt-3 leading-relaxed">
            En la siguiente sesión leerás el código de la URL y
            consultarás la información del país seleccionado.
          </p>
        </section>
      </main>
    </div>
  );
}