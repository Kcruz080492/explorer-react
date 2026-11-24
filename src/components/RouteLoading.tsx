import type { JSX } from "react";
 
export function RouteLoading(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center
      bg-neutral-50 px-4 text-neutral-900">
      <p role="status" aria-live="polite" className="text-lg">
        Cargando página de detalle…
      </p>
    </div>
  );
}
