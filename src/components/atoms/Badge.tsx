// Badge.tsx — presenta la región como texto, conservando el diseño original.
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
