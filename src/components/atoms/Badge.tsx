// Badge.tsx — presenta la región como una etiqueta reutilizable.
import type { JSX } from "react";

interface BadgeProps {
  region: string;
}

export function Badge({ region }: BadgeProps): JSX.Element {
  return (
    <span className="inline-flex rounded-full bg-teal-500 px-3 py-1 text-sm font-semibold text-white">
      {region}
    </span>
  );
}