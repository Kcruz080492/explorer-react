// Flag.tsx — muestra la bandera y conserva la imagen de respaldo.
import type { JSX, SyntheticEvent } from "react";

interface FlagProps {
  src: string;
  alt: string;
}

function handleFlagError(event: SyntheticEvent<HTMLImageElement>): void {
  const image: HTMLImageElement = event.currentTarget;
  const fallbackUrl: string = `${import.meta.env.BASE_URL}placeholder.png`;

  // Evita volver a asignar el respaldo si este también falla.
  if (image.src === new URL(fallbackUrl, window.location.href).href) {
    return;
  }
  image.src = fallbackUrl;
}

export function Flag({ src, alt }: FlagProps): JSX.Element {
  const flagUrl: string =
    src || `${import.meta.env.BASE_URL}placeholder.png`;

  return (
    <img
      className="aspect-3/2 w-full shrink-0 object-cover @min-[20rem]:aspect-auto @min-[20rem]:w-2/5"
      src={flagUrl}
      alt={alt}
      loading="lazy"
      onError={handleFlagError}
    />
  );
}
