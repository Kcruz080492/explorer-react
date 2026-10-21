// Badge.tsx — presenta la región como una etiqueta reutilizable.
import type { JSX } from "react";

interface BadgeProps {
  region: string;
}

export function Badge({ region }: BadgeProps): JSX.Element {
  return (
    <span className="text-inherit">
      {region}
    </span>
  );
}