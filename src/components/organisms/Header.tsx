// Header.tsx — organiza el título y el contenido de presentación.
import type { JSX, ReactNode } from "react";

interface HeaderProps {
  title: string;
  children: ReactNode;
}

export function Header({ title, children }: HeaderProps): JSX.Element {
  return (
    <header className="mb-8 md:mb-10">
      <h1 className="max-w-2xl text-(length:--font-page-title) font-semibold leading-tight text-neutral-900">
        {title}
      </h1>
      {/* children es el contenido colocado entre las etiquetas Header. */}
      <div className="mt-3 max-w-xl text-base leading-7 text-neutral-600">
        {children}
      </div>
    </header>
  );
}